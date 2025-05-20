from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import logging
from django.conf import settings
from clarifai.client.model import Model
import requests
import base64
from .models import FoodItem, MealAnalysis
from .serializers import MealAnalysisSerializer,UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from deep_translator import MyMemoryTranslator
from googletrans import Translator
from googletrans import Translator
translator = Translator()

# đăng ký
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self,request,*args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.create_user(username=username, email=email, password=password)
        refresh = RefreshToken.for_user(user)

        return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

# login
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self,request,*args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        serialized_user = UserSerializer(user).data 
        if user is not None:
            # Tạo refresh token và access token cho người dùng hợp lệ
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user':serialized_user,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
# logout
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

logger =logging.getLogger(__name__)
def get_nutritional_info(food_name):
    try:
        url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
        headers = {
            'x-app-id': settings.NUTRITIONIX_APP_ID,
            'x-app-key': settings.NUTRITIONIX_APP_KEY,
            'Content-Type': 'application/json'
        }
        body = {
            'query': food_name
        }

        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        data = response.json()

        results = []
        for food in data.get('foods', [])[:3]:
            results.append({
                'name': translator.translate(food.get('food_name'),dest='vi').text,
                'calories_per_100g': food.get('nf_calories', 0),
                'protein': food.get('nf_protein', 0),
                'carb': food.get('nf_total_carbohydrate', 0),
                'fat': food.get('nf_total_fat', 0),
            })

        return results

    except requests.RequestException as e:
        logger.error(f"Lỗi Nutritionix API cho {food_name}: {str(e)}")
        return []


def save_food_items(nutritional_data):
    food_items = []
    for item in nutritional_data:
        if isinstance(item, dict) and 'error' not in item:
            try:
                food_item, created = FoodItem.objects.get_or_create(
                    name=translator.translate(item["name"],dest='vi').text,
                    defaults={
                        'calories_per_100g': item['calories_per_100g'],
                        'protein': item['protein'],
                        'carb': item['carb'],
                        'fat': item['fat'],
                        'description': '',
                    }
                )
                food_items.append(food_item)
            except Exception as e:
                logger.error(f"Lỗi khi lưu FoodItem cho {item['name']}: {str(e)}")
    return food_items
class AnalyzeFoodImage(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        image = request.FILES.get('image')
        if not image:
            return Response({"error": "Không cung cấp ảnh"}, status=status.HTTP_400_BAD_REQUEST)

        if image.content_type not in ['image/jpeg', 'image/png']:
            return Response({"error": "Định dạng ảnh không hợp lệ. Chỉ chấp nhận JPEG/PNG."}, 
                           status=status.HTTP_400_BAD_REQUEST)
        if image.size > 5 * 1024 * 1024:
            return Response({"error": "Kích thước ảnh vượt quá giới hạn 5MB."}, 
                           status=status.HTTP_400_BAD_REQUEST)

        try:
            image_content = image.read()
            logger.info(f"Nhận được ảnh từ người dùng {request.user.username}, kích thước: {image.size} bytes")

            # Khởi tạo Clarifai model
            model = Model(url="https://clarifai.com/clarifai/main/models/food-item-recognition", 
                         pat="ea05928829e841cbabb675ce763428c3")  # Sử dụng settings.CLARIFAI_PAT
            logger.info("Đã khởi tạo Clarifai model")

            # Gửi ảnh đến Clarifai
            try:
                response = model.predict_by_bytes(image_content, input_type="image")
                logger.info(f"Phản hồi từ Clarifai: {response}")
            except Exception as clarifai_error:
                logger.error(f"Lỗi Clarifai: {str(clarifai_error)}")
                return Response({"error": f"Lỗi Clarifai: {str(clarifai_error)}"}, 
                               status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Xử lý phản hồi từ Clarifai
            if not response.outputs or not response.outputs[0].data.concepts:
                return Response({"error": "Không phát hiện thực phẩm trong ảnh"}, 
                               status=status.HTTP_400_BAD_REQUEST)

            # Lấy danh sách concepts
            concepts = response.outputs[0].data.concepts
            logger.info(f"Số concepts nhận được: {len(concepts)}")

            food_names = []
            for i, concept in enumerate(concepts[:3]):
                logger.info(f"Concept {i} attributes: {dir(concept)}")
                try:
                    food_names.append(concept.name)
                except AttributeError as e:
                    logger.error(f"Lỗi khi truy cập concept.name cho concept {i}: {str(e)}")
                    return Response({"error": f"Lỗi xử lý concept: {str(e)}"}, 
                                   status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if not food_names:
                return Response({"error": "Không phát hiện thực phẩm trong ảnh"}, 
                               status=status.HTTP_400_BAD_REQUEST)
            
            logger.info(f"Thực phẩm được phát hiện: {food_names}")
            translated_foods = [translator.translate(name, dest='vi').text for name in food_names]
            nutritional_data = []
            for food_name in food_names:
                nutritional_info = get_nutritional_info(food_name)
                if isinstance(nutritional_info, list):
                    nutritional_data.extend(nutritional_info)
                else:
                    nutritional_data.append(nutritional_info)

            food_items = save_food_items(nutritional_data)
            if not food_items:
                return Response({"error": "Không tìm thấy thực phẩm hợp lệ"}, 
                               status=status.HTTP_400_BAD_REQUEST)

            total_calories = sum(item.calories_per_100g for item in food_items)

            meal_analysis = MealAnalysis.objects.create(
                user=request.user,
                image=image,
                total_calories=total_calories
            )
            meal_analysis.food_items.set(food_items)

            serializer = MealAnalysisSerializer(meal_analysis)


            return Response({
                'results': serializer.data,
                'detected_foods': translated_foods,

            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Lỗi khi xử lý ảnh cho người dùng {request.user.username}: {str(e)}", exc_info=True)
            return Response({"error": f"Không thể xử lý ảnh: {str(e)}"}, 
                           status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class Meal_Log(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,*args, **kwargs):
        try:
            latest_meals = MealAnalysis.objects.filter(user=request.user).order_by('-analyzed_at')[:6]
            serializer = MealAnalysisSerializer(latest_meals, many=True, context={'request': request})
            logger.info(f"Trả về {len(latest_meals)} bữa ăn gần đây cho người dùng {request.user.username}")
            return Response({
                'results': serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Lỗi khi lấy bữa ăn gần đây cho người dùng {request.user.username}: {str(e)}")
            return Response({
                "error": f"Lỗi khi lấy dữ liệu: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
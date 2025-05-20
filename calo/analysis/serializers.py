from rest_framework import serializers
from .models import FoodItem, MealAnalysis
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']



class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'calories_per_100g', 'protein', 'carb', 'fat', 'description']

class MealAnalysisSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    food_items = FoodItemSerializer(many=True, read_only=True)
    image = serializers.ImageField()

    class Meta:
        model = MealAnalysis
        fields = ['id', 'user', 'image', 'food_items', 'total_calories', 'analyzed_at']

    def create(self, validated_data):
        image = validated_data.pop('image')
        meal = MealAnalysis.objects.create(
            user=self.context['request'].user,
            total_calories=0,  # Sẽ cập nhật sau khi phân tích
            image=image
        )
        return meal
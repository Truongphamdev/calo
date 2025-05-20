from django.urls import path
from . import views
from .views import RegisterAPIView, LoginAPIView, LogoutAPIView,AnalyzeFoodImage,Meal_Log
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('analyze/', AnalyzeFoodImage.as_view(), name='analyze'),
    path('meallog/', Meal_Log.as_view(), name='meals'),

    # Thêm endpoint JWT
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

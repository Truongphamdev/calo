from django.contrib import admin
from .models import FoodItem, MealAnalysis

@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'calories_per_100g', 'protein', 'carb', 'fat')
    search_fields = ('name',)
    list_filter = ('calories_per_100g',)

@admin.register(MealAnalysis)
class MealAnalysisAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_calories', 'analyzed_at')
    list_filter = ('user', 'analyzed_at')
    search_fields = ('user__username',)
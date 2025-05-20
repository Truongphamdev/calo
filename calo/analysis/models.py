from django.db import models
from django.contrib.auth.models import User;
# Create your models here.

class FoodItem(models.Model):
    name = models.CharField(max_length=200,unique=True)
    calories_per_100g = models.FloatField()
    protein = models.FloatField(default=0)
    carb = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class MealAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='meals')
    image = models.ImageField(upload_to='meals')
    food_items = models.ManyToManyField(FoodItem, related_name='meals')
    total_calories = models.FloatField(default=0)
    analyzed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Meal by {self.user.username} at {self.analyzed_at}"

    class Meta:
        ordering = ['-analyzed_at'] 
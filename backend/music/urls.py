from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                   
from music import views     

router = routers.DefaultRouter() 
router.register('users', views.UserView)                 
router.register('ratings', views.RatingsView) 

urlpatterns = [
    path('', include(router.urls)) , 
]
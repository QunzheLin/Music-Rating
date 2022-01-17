from django.shortcuts import render
from rest_framework import viewsets  
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import RatingsSerializer, ArtistsSerializer, UserSerializer
from .models import Artists, Ratings
from django.contrib.auth.models import User

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class RatingsView(viewsets.ModelViewSet):
    serializer_class = RatingsSerializer
    queryset = Ratings.objects.all()

class ArtistsView(viewsets.ModelViewSet):
    serializer_class = ArtistsSerializer
    queryset = Artists.objects.all()


from rest_framework import serializers
from .models import Ratings, Artists
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'password')
        extra_kwargs = {'password':{'write_only':True, 'required':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ('id', 'username', 'song', 'rating', 'artist')

class ArtistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ('song', 'artist')

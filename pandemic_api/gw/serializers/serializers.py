from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from ..models import Search


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'created', 'user_id')

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = ('username', 'query' ,'graph_data')
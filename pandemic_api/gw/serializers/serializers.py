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

class SearchSerializers(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = ('last_looked_region', 'last_search_keyword', 'last_looked' ,'user_id')
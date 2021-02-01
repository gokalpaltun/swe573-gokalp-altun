from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import serializers
from .services.user import UserService
from .services.location import LocationService
from .services.search import SearchService
from .services.data_analysis import DataAnalysisService

from django.http import JsonResponse
from .base_errors import errors
import json


@api_view(['POST'])
def login(request):
    username = request.data['username']
    password = request.data['password']
    user_token = UserService.login(
        request, username=username, password=password)
    if user_token:
        res = {}
        res["token"] = serializers.TokenSerializer(
            user_token['token'], many=False).data
        res["user"] = serializers.UserSerializer(
            user_token['user'], many=False).data
        return Response(res)
    else:
        raise errors.UserCannotLogin()


@api_view(['POST'])
def signup(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']
    user_token = UserService.signup(
        request, username=username, password=password, email=email)
    res = {}
    if user_token is not None:
        res["token"] = serializers.TokenSerializer(
            user_token['token'], many=False).data
        res["user"] = serializers.UserSerializer(
            user_token['user'], many=False).data
        return Response(res)
    else:
        raise errors.UserAlreadyExists()


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def hello(request):
    if request.user.is_anonymous:
        raise errors.AnonymousUserError()
    user = serializers.UserSerializer(request.user, many=False).data
    return Response(user)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def analysis(request):
    if request.user.is_anonymous:
        raise errors.AnonymousUserError()
    query = request.data["query"]
    user_meta = {
        "username": request.user.username,
    }
    try:
        data_analysis_service = DataAnalysisService(
            user=user_meta, query=query)
        data_analysis_service.start_analysis()
        data_analysis_service.send_data_to_S3()

        res = {
            "status": True
        }
        return Response(res)
    except Exception as err:
        print("analysis_error")
        print(err)
        raise errors.AnalysisHaveError()


@api_view(['GET'])
def search(request):
    search_history = None
    if request.user.is_anonymous is True:
        search_history = SearchService.get_search_history(user=None)
    elif request.user.is_anonymous is False:
        search_history = SearchService.get_search_history(user=None)
    search_result = serializers.SearchSerializer(
        search_history, many=True).data
    res = {"searched_items": []}
    for item in search_result:
        search_item = {
            "username": item["username"],
            "query": item["query"],
            "graph_data": json.loads(item["graph_data"])
        }
        res["searched_items"].append(search_item)
    return Response(res)

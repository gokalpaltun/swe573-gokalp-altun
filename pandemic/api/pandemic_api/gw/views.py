# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers.token import TokenSerializer
from .serializers.user import UserSerializer
from .services.account import UserService



@api_view(['GET'])
def init(request):
    message = ""
    if request.user.is_anonymous:
        message = "Signup or Login"
    elif request.user.is_anonymous is False:
        message = "Direct home,Do Some prepration"
    return Response({"message": message})


@api_view(['POST'])
def login(request):
    username = request.data['username']
    password = request.data['password']
    user_token = UserService.login(request, username=username, password=password)
    res = {}
    if user_token:
        res["token"] = TokenSerializer(user_token['token'], many=False).data
        res["user"] = UserSerializer(user_token['user'], many=False).data
    else:
        res["user"] = "Nothing"
    return Response(res)


@api_view(['POST'])
def signup(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']
    user_token = UserService.signup(request, username=username, password=password, email=email)
    res = {}
    if user_token:
        res["token"] = TokenSerializer(user_token['token'],many=False).data
        res["user"] = UserSerializer(user_token['user'], many=False).data

    else:
        res["user"] = "Nothing"
    return Response(res)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def hello(request):
    if request.user:

        serializer = UserSerializer(request.user, many=False)
        return Response(serializer.data)


from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.db.models import Q

class UserService:
    @staticmethod
    def login(request, username, password):
        user = authenticate(request=request, username=username, password=password)
        if user is not None:
            login(request, user)
            token = UserService.renew_token(user)
            return {'user': user, 'token': token}
        else:
            return {}

    @staticmethod
    def signup(request, username, password, email):
        try:
            user = User.objects.get(Q(username=username) | Q(email=email))
            if user is not None:
                return "user already exists"
        except Exception as exc:
            user = User.objects.create_user(username=username, password=password, email=email)
            if user is not None:
                return UserService.login(request, username=username, password=password)
            return "no"

    @staticmethod
    def renew_token(user):
        token, _ = Token.objects.get_or_create(user=user)
        if token is not None:
            token.delete()
        token = Token.objects.create(user=user)
        return token
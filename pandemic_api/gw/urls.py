
from django.conf.urls import url
from rest_framework.authtoken import views as auth_token_views
from . import views


urlpatterns = [
    url(
        r'api/v1/init/',
        # auth_token_views.obtain_auth_token,
        views.init,
        name='init'
    ),
    url(
        r'api/v1/login/',
        views.login,
        name='login'
    ),
    url(
        r'api/v1/signup/',
        views.signup,
        name='signup'
    ),
    url(
        r'api/v1/hello/',
        views.hello,
        name='hello'
    ),
]
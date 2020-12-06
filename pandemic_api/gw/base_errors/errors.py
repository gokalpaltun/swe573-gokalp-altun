from rest_framework.exceptions import APIException

from rest_framework import status


class AnonymousUserError(APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = 'You dont have authorization to view this page.'
    default_code = 'anonymous_user_error'


class UserAlreadyExists(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'You dont have authorization to view this page.'
    default_code = 'user_already_exists'


class UserCannotLogin(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'User cannot login successfuly'
    default_code = 'user_cannot_login'

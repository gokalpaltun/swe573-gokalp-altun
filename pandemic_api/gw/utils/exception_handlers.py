from rest_framework.views import exception_handler


def response_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data["meta"] = {}
        response.data["meta"]["status_code"] = response.status_code
        response.data["meta"]["default_code"] = exc.default_code
        response.data["meta"]["detail"] = str(response.data['detail'])
        if hasattr(exc, 'error_code'):
            response.data["meta"]['error_code'] = exc.error_code
        response.data["data"] = {"hello": "SWE573"}
        del response.data["detail"]
    return response

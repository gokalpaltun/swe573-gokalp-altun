from datetime import datetime
import asyncio
import json
import uuid


class ResponseAdditionInfoMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        self.request_logger(request, response)
        if(response.status_code == 200):
            response = self.render_response(response)
        return response

    def render_response(self, response):
        # get data from content
        data = json.loads(response.content)
        # initialize from stratch
        response.content = ""
        response.data["data"] = {}
        response.data["meta"] = {}
        # fill the blanks :)
        response.data["meta"] = {
            "status_code": response.status_code,
            "detail": ""
        }
        for (key, val) in data.items():
            response.data["data"][key] = json.loads(json.dumps(obj=val))
            del response.data[key]
        response.content = response.rendered_content
        return response

    def request_logger(self, request, response):
        if(request.user.is_anonymous is False):
            print('user_id', request.user.id)
            print(uuid.uuid4().hex)
        time_start = datetime.now()
        time_end = datetime.now()
        print(time_end-time_start, request.path)

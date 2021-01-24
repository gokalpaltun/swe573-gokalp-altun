from re import search
from ..models import Search
import datetime


class SearchService:
    @staticmethod
    def get_search_history(user):
        if(user != None):
            return Search.objects.filter(username=user.username).order_by("-id")
        else:
            return Search.objects.order_by("-id")

    @staticmethod
    def insert_user_search(username, query, graph_data):
        search = Search(username=username, query=query, graph_data=graph_data)
        search.save()

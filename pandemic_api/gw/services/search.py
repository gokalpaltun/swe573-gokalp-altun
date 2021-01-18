from re import search
from ..models import Search
import datetime


class SearchService:
    @staticmethod
    def get_search_history(user):
        if(user != None):
            return Search.objects.filter(username=user.username)
        else:
            return Search.objects.all()

    @staticmethod
    def insert_user_search(username, query, graph_data):
        search = Search(2, username, query, graph_data)
        search.save()

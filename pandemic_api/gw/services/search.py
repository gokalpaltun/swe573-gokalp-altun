from re import search
from ..models import Search
import datetime

class SearchService:
    @staticmethod
    def get_search_history(user):
      return Search.objects.filter(user_id=user.id)
    
    @staticmethod
    def update_search_history(user,searchCtx):
      user_id = user.id
      last_looked_region = searchCtx.looked_region
      last_search_keyword = searchCtx.search_keyword
      last_looked = datetime.date.today
      Search.objects.create(user_id,last_looked_region,last_search_keyword,last_looked)
        


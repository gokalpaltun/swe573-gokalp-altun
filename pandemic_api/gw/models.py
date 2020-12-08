from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Search(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    last_looked_region = models.CharField(max_length=20)
    last_search_keyword = models.CharField(max_length=100)
    last_looked = models.DateField()
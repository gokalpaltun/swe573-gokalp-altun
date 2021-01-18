from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Search(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, default="test")
    query = models.CharField(max_length=100, default="test")
    graph_data = models.CharField(
        max_length=1000, default="test")  # json object as string

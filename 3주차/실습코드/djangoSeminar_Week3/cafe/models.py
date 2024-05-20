from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    pw = models.CharField(max_length=30)
    email = models.EmailField()


class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=50, null=False, blank=False)
    content = models.TextField(max_length=5000, null=False, blank=False)
    create_date = models.DateTimeField(auto_now_add=True)



from django.db import models


class User(models.Model):
    user_pk = models.AutoField(primary_key=True)
    id = models.CharField(max_length=30)
    pw = models.CharField(max_length=30)
    email = models.EmailField()

    def __str__(self):
        return self.id


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null=False, blank=False)
    content = models.TextField(max_length=5000, null=False, blank=False)
    create_date = models.DateTimeField(auto_now_add=True)



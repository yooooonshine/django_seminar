
from django.contrib import admin
from django.urls import path, include

from user import views

urlpatterns = [
    path("", views.login_view),
    path("signup/", views.signup_view),
    path("login/", views.login_view),
]

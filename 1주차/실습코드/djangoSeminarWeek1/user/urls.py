from django.contrib import admin
from django.urls import path, include

from user import views

urlpatterns = [
    path('main/', views.main),
    path('login/', views.login_view)
]
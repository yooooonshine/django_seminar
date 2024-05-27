from django.urls import path

from fruit import views

urlpatterns = [
    path('', views.main_view)
]
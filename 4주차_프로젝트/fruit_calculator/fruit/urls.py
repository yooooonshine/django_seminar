from django.urls import path

from fruit import views

urlpatterns = [
    path('', views.main_view),
    path('fruit/calculate/', views.calculate_fruit),
    path('history-page/', views.history_view),
    path('profit/', views.requestProfit)
]
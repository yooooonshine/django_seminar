from django.urls import path

from cafe import views

urlpatterns = [
    path("", views.login_view),
    path("signup/", views.signup_view),
    path("login/", views.login_view),
    path('cafe/article/', views.article),
    path('cafe_page/', views.cafe_view),
]
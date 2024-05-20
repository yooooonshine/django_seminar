import json

from django.http import JsonResponse
from django.shortcuts import render

from cafe.models import User, Article


def login_view(request):
    if request.method == 'POST':
        user_id = request.POST.get('id')
        user_pw = request.POST.get('pw')

        if User.objects.filter(id=user_id, pw=user_pw).exists():
            return JsonResponse({'isSuccess': True, 'user_id': user_id})
        return JsonResponse({'isSuccess': False})

    return render(request, "cafe/login.html")


def signup_view(request):
    if request.method == "POST":
        user_id = request.POST.get('id')
        user_pw = request.POST.get('pw')
        user_email = request.POST.get('email')

        if not User.objects.filter(id=request.POST.get('id')).exists():
            user = User(id=user_id, pw=user_pw, email=user_email)
            user.save()

            return JsonResponse({'isSuccess': True})

        return JsonResponse({'isSuccess': False})
    return render(request, "cafe/signup.html")


def cafe_view(request):
    return render(request, "cafe/cafe.html")


def article(request):
    if request.method == "GET":
        articles = Article.objects.all().values('user_id', 'title', 'content')
        return JsonResponse({'articles': list(articles)})

    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get('userId')
        title = data.get('title')
        content = data.get('content')

        user = User.objects.get(id=user_id)

        Article(user=user, title=title, content=content).save()

        return JsonResponse({"isSuccess": True})

    if request.method == "DELETE":
        article_id = request.GET.get("article_id")

        Article.objects.get(article_id=article_id).delete()

        return JsonResponse({"isSuccess": True})

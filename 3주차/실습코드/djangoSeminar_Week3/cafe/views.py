from django.http import JsonResponse
from django.shortcuts import render

from cafe.models import User


def login_view(request):

    if request.method == 'POST':
        user_id = request.POST.get('id')
        user_pw = request.POST.get('pw')

        if User.objects.filter(id=user_id, pw=user_pw).exists():
            return render(request, "cafe/cafe.html")

    return render(request, "cafe/login.html")


def signup_view(request):
    if request.method == "POST":
        user_id = request.POST.get('id')
        user_pw = request.POST.get('pw')
        user_email = request.POST.get('email')

        if not User.objects.filter(id=request.POST.get('id')).exists():
            user = User(id=user_id, pw=user_pw, email=user_email)
            user.save()

            return JsonResponse({'isSuccess' : True})

        return JsonResponse({'isSuccess' : False})
    return render(request, "cafe/signup.html")

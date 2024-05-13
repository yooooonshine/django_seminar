from django.http import JsonResponse
from django.shortcuts import render

users = {}


def login_view(request):
    global users

    if request.method == 'POST':
        user_id = request.POST.get("id")
        user_pw = request.POST.get("pw")

        response = {"isSuccess": False}
        for id, pw in users.items():
            if id == user_id and pw == user_pw:
                response["isSuccess"] = True

        return JsonResponse(response)

    return render(request, "user/login.html")


def signup_view(request):
    global users

    if request.method == "POST":
        user_id = request.POST.get("id")
        user_pw = request.POST.get("pw")

        response = {}
        if user_id in users:
            response["isSuccess"] = False
        else:
            users[user_id] = user_pw

            response["isSuccess"] = True
        return JsonResponse(response)

    return render(request, "user/signup.html")


from django.shortcuts import render


def main(request):
    return render(request, "user/main.html")


def login_view(request):
    if request.method == "POST":
        user_id = request.POST.get("id")
        user_pw = request.POST.get("pw")

        print(user_id, user_pw)
        return render(request, "user/main.html")

    user_id = request.GET.get("id")
    user_pw = request.GET.get("pw")

    print(user_id, user_pw)
    return render(request, "user/main.html")
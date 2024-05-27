import json

from django.http import JsonResponse
from django.shortcuts import render

from fruit.models import Profit


def main_view(request):
    return render(request, "fruit/main.html")


def history_view(request):
    return render(request, "fruit/history.html")


def calculate_fruit(request):
    data = json.loads(request.body)
    fruits_data = data['fruits']

    total_cost_price = 0
    total_selling_price = 0
    for fruit in fruits_data:
        name = fruit["name"]
        cost_price = int(fruit["costPrice"])
        selling_price = int(fruit["sellingPrice"])
        quantity = int(fruit["quantity"])

        total_cost_price += cost_price * quantity
        total_selling_price += selling_price * quantity

    total_earning_price = total_selling_price - total_cost_price
    rate_of_return = 100 * (total_earning_price / total_cost_price)

    response = {
        "result": {"totalCostPrice": total_cost_price,
                   "totalSellingPrice": total_selling_price,
                   "totalEarningPrice": total_earning_price,
                   "rateOfReturn": rate_of_return}
    }

    return JsonResponse(response)


def requestProfit(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        total_cost_price = data["totalCostPrice"]
        total_selling_price = data["totalSellingPrice"]
        total_earning_price = data["totalEarningPrice"]
        rate_of_return = data["rateOfReturn"]

        profit = Profit(total_cost_price=total_cost_price, total_selling_price=total_selling_price,
                        total_earning_price=total_earning_price, rate_of_return=rate_of_return)
        profit.save()

        return JsonResponse({"success": True})

    profits = Profit.objects.all().values("total_cost_price", "total_selling_price", "total_earning_price",
                                          "rate_of_return", "create_date")
    return JsonResponse({"result": list(profits)})

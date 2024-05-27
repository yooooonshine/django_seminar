from django.db import models


# Create your models here.
class Profit(models.Model):
    total_cost_price = models.IntegerField(null=False)
    total_selling_price = models.IntegerField(null=False)
    total_earning_price = models.IntegerField(null=False)
    rate_of_return = models.DecimalField(null=False, max_digits=5, decimal_places=2)
    create_date = models.DateTimeField(auto_now_add=True)

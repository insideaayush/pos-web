from django.contrib import admin
from .models import *

admin.site.register(AccessPermission)
admin.site.register(Store)
admin.site.register(Warehouse)
admin.site.register(Staff)
admin.site.register(Customer)
admin.site.register(Vendor)
admin.site.register(Payment)
admin.site.register(Transaction)
admin.site.register(Sale)
admin.site.register(Product)
admin.site.register(ProductInSale)
admin.site.register(Purchase)
admin.site.register(ProductInPurchase)
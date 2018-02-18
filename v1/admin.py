from django.contrib import admin
from .models import Store, Staff, Customer, Payment, Transaction, Sale, Product, ProductInSale

# Register your models here.
admin.site.register(Store)
admin.site.register(Staff)
admin.site.register(Customer)
admin.site.register(Payment)
admin.site.register(Transaction)
admin.site.register(Sale)
admin.site.register(Product)
admin.site.register(ProductInSale)
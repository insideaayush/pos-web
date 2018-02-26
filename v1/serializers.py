from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin
from django.contrib.auth.models import User
from v1.models import *
from django.db import transaction
from sequences import get_next_value

class UserSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name')

class StaffSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Staff
        fields = ('url', 'id', 'user', 'reports_to', 'permissions')

class CustomerSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ('url', 'id', 'name', 'gender', 'mobile')

class StoreSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Store
        fields = ('url', 'id', 'name', 'code', 'location')

class PaymentSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('url', 'id', 'method', 'amount', 'created_on')

class TransactionSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    all_payments = PaymentSerializer(many=True)

    class Meta:
        model = Transaction
        fields = ('url', 'id', 'all_payments', 'created_on')

class ProductSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'url', 
            'id', 
            'name', 
            'product_id', 
            'description', 
            'cost_price', 
            'max_retail_price', 
            'selling_price', 
            'category', 
            'brand', 
            'color', 
            'design', 
            'size', 
            'quality'
        )

class ProductInSaleSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = ProductInSale
        fields = ('url', 'id', 'sale' , 'product', 'total_qty')

def get_next_invoice_no(store_code):
    code = store_code.upper()
    inv_number = "%s%d" % (code, get_next_value(code))

class SaleSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    products_in_sale = ProductInSaleSerializer(many=True)
    class Meta:
        model = Sale
        fields = (
            'url', 
            'id',
            'invoice_id', 
            'channel',
            'customer',
            'transaction',
            'staff',
            'store',
            'created_on',
            'total_tax',
            'total_amount',
            'products_in_sale', 
        )




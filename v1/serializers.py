from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin
from django.contrib.auth.models import User
from v1.models import *
from django.db import transaction as trxn
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
        fields = ('url', 'id', 'name', 'location')

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
    code = str(store_code).upper()
    inv_number = "INV%s000%d" % (code, get_next_value(code))
    return inv_number

class SaleSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    products_in_sale = ProductInSaleSerializer(many=True)
    # products_in_sale = serializers.PrimaryKeyRelatedField(queryset=ProductInSale.objects.all(),many=True)
    transaction = TransactionSerializer()
    customer = CustomerSerializer()
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

    def create(self, validated_data):
        products_in_sale_data = validated_data.pop('products_in_sale')
        transaction_data = validated_data.pop('transaction')
        all_payments_data = transaction_data.pop('all_payments')
        transaction = Transaction.objects.create(**transaction_data)
        store_id = validated_data.get('store').id
        customer_data = validated_data.pop('customer')
        if customer_data.get('mobile'):
            customer = Customer.objects.create(**customer_data)
        else:
            cus_id = self.context['request'].data['customer']['id']   
            customer = Customer.objects.get(pk=cus_id)
        for payment_data in all_payments_data:
            transaction.all_payments.add(Payment.objects.create(**payment_data))
        with trxn.atomic():
            sale = Sale.objects.create(customer=customer, transaction=transaction, invoice_id=get_next_invoice_no(store_id), **validated_data)
        for product_in_sale_data in products_in_sale_data:
            product_in_sale_data.pop('sale')
            ProductInSale.objects.create( sale=sale, **product_in_sale_data)
        return sale




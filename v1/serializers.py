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

class VendorSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
        fields = ('url', 'id', 'name', 'mobile')

class StoreSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Store
        fields = ('url', 'id', 'name', 'location')

class WarehouseSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Warehouse
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

class ProductInPurchaseSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = ProductInPurchase
        fields = ('url', 'id', 'purchase' , 'product', 'total_qty')

def get_next_invoice_no(store_code):
    code = str(store_code).upper()
    inv_number = "INV%s000%d" % (code, get_next_value('INV%s' % code))
    return inv_number

def get_next_purchase_no(ware_house_code):
    code = str(ware_house_code).upper()
    pur_no = "PUR%s000%d" % (code, get_next_value('PUR%s' % code))
    return pur_no

class SaleSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    products_in_sale = ProductInSaleSerializer(many=True)
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
        with trxn.atomic():
            # check if items are in stock or not
            for product_in_sale_data in products_in_sale_data:
                try:
                    product_stock_level = ProductStockLevel.objects.get(product=product_in_sale_data['product'], store=validated_data.get('store'))
                except:
                    raise serializers.ValidationError("Item not in Stock")
                else:
                    if not product_stock_level.quantity >= product_in_sale_data.get('total_qty'):
                        raise serializers.ValidationError("Item not sufficiently in Stock")
            for payment_data in all_payments_data:
                transaction.all_payments.add(Payment.objects.create(**payment_data))
            sale = Sale.objects.create(customer=customer, transaction=transaction, invoice_id=get_next_invoice_no(store_id), **validated_data)
            for product_in_sale_data in products_in_sale_data:
                product_in_sale_data.pop('sale')
                ProductInSale.objects.create( sale=sale, **product_in_sale_data)
                product_stock_level = ProductStockLevel.objects.get(
                    product=product_in_sale_data['product'],
                    store=validated_data.get('store'))
                product_stock_level.quantity -= product_in_sale_data.get(
                    'total_qty')
                product_stock_level.save()
        return sale

class PurchaseSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    products_in_purchase = ProductInPurchaseSerializer(many=True)
    transaction = TransactionSerializer()
    vendor = VendorSerializer()
    class Meta:
        model = Purchase
        fields = (
            'url',
            'id',
            'purchase_id',
            'vendor',
            'transaction',
            'staff',
            'warehouse',
            'created_on',
            'total_tax',
            'total_amount',
            'products_in_purchase',
        )

    def create(self, validated_data):
        products_in_purchase_data = validated_data.pop('products_in_purchase')
        transaction_data = validated_data.pop('transaction')
        all_payments_data = transaction_data.pop('all_payments')
        transaction = Transaction.objects.create(**transaction_data)
        warehouse_id = validated_data.get('warehouse').id
        vendor_data = validated_data.pop('vendor')
        if vendor_data.get('mobile'):
            vendor = Vendor.objects.create(**vendor_data)
        else:
            vendor_id = self.context['request'].data['vendor']['id']
            vendor = Vendor.objects.get(pk=vendor_id)
        for payment_data in all_payments_data:
            transaction.all_payments.add(Payment.objects.create(**payment_data))
        with trxn.atomic():
            purchase = Purchase.objects.create(vendor=vendor, transaction=transaction, purchase_id=get_next_purchase_no(warehouse_id), **validated_data)
            for product_in_purchase_data in products_in_purchase_data:
                product_in_purchase_data.pop('purchase')
                ProductInPurchase.objects.create(purchase=purchase, **product_in_purchase_data)
                try:
                    product_stock_level = ProductStockLevel.objects.get(product=product_in_purchase_data['product'], warehouse=validated_data.get('warehouse'))
                except :
                    product_stock_level = ProductStockLevel.objects.create(product=product_in_purchase_data['product'], warehouse=validated_data.get('warehouse'), quantity=product_in_purchase_data.get('total_qty'))
                else:
                    product_stock_level.quantity += product_in_purchase_data.get('total_qty')
                    product_stock_level.save()
        return purchase

class ProductStockLevelSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    product = ProductSerializer()
    store = StoreSerializer()
    warehouse = WarehouseSerializer()

    class Meta:
        model = ProductStockLevel
        fields = (
            'url',
            'id',
            'product',
            'store',
            'warehouse',
            'quantity',
        )
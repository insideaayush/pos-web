from rest_framework import serializers
from django.contrib.auth.models import User
from v1.models import Staff, Product

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name')

class StaffSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Staff
        fields = ('url', 'id', 'user', 'reports_to', 'permissions')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('url', 'id', 'name', 'product_id', 'description', 'wholesale_price', 'retail_price')
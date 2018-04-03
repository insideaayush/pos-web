from django.contrib.auth.models import User
from .models import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from v1.serializers import *
from django_filters.rest_framework import DjangoFilterBackend

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'products': reverse('product-list', request=request, format=format),
        'categories': reverse('category-list', request=request, format=format),
    })

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides list and detail actions
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class StaffViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides list and detail actions
    """
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class CustomerViewset(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class =CustomerSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('mobile', 'name')

class VendorViewset(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class =VendorSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('mobile', 'name')

class StoreViewset(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class =StoreSerializer

class WarehouseViewset(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class =WarehouseSerializer

class ProductViewset(viewsets.ModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class PaymentViewset(viewsets.ModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class TransactionViewset(viewsets.ModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class SaleViewset(viewsets.ModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

class PurchaseViewset(viewsets.ModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class ProductInSaleViewset(viewsets.ModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = ProductInSale.objects.all()
    serializer_class = ProductInSaleSerializer

class ProductInPurchaseViewset(viewsets.ModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = ProductInPurchase.objects.all()
    serializer_class = ProductInPurchaseSerializer

class ProductStockLevelViewset(viewsets.ReadOnlyModelViewSet):
    """
    This view automatically provides list, detail, retrieve, update, partial update and delete actions
    """
    queryset = ProductStockLevel.objects.all()
    serializer_class = ProductStockLevelSerializer

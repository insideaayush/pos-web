from django.urls import path, include
from rest_framework.routers import DefaultRouter
from v1 import views

from rest_framework.schemas import get_schema_view
schema_view = get_schema_view(title="POS API")

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'staff', views.StaffViewSet)
router.register(r'customers', views.CustomerViewset)
router.register(r'stores', views.StoreViewset)
router.register(r'products', views.ProductViewset)
router.register(r'payments', views.PaymentViewset)
router.register(r'transactions', views.TransactionViewset)
router.register(r'sales', views.SaleViewset)
router.register(r'productinsales', views.ProductInSaleViewset)

urlpatterns = [
    path('schema/', schema_view),
    path('', include(router.urls)),
]

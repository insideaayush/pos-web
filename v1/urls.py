from django.urls import path, include
from rest_framework.routers import DefaultRouter
from v1 import views

from rest_framework.schemas import get_schema_view
schema_view = get_schema_view(title="POS API")

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('schema/', schema_view),
    path('', include(router.urls)),
]

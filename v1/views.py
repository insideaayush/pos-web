from django.contrib.auth.models import User
from .models import Staff
from rest_framework import viewsets
from rest_framework.decorators import api_view
from v1.serializers import UserSerializer, StaffSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users' : reverse('user-list', request=request, format=format),
        'staff' : reverse('staff-list', request=request, format=format),
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

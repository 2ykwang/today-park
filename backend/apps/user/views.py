from rest_framework import generics, permissions
from rest_framework.decorators import permission_classes

from .models import User
from .serializers import UserSerializer


# TODO: APIVIEW
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]  # noqa
    serializer_class = UserSerializer

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from . import views

# EndPoints
"""
    /api/register
    /api/login
    /api/token/refresh
    /api/token/verify
"""

urlpatterns = [
    path("register/", views.UserRegisterView.as_view(), name="f"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify", TokenVerifyView.as_view(), name="token_verify"),
]

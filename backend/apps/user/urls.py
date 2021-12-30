from django.urls import path
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from . import views

# EndPoints
"""
    /api/register
    /api/login
    /api/logout
    /api/token/refresh
    /api/token/verify

    /api/user/change_password
"""

urlpatterns = [
    path("register/", views.UserRegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("logout/", TokenBlacklistView.as_view(), name="logout"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify", TokenVerifyView.as_view(), name="token_verify"),
    path(
        "user/",
        views.UserAPIView.as_view(),
        name="user",
    ),
    path(
        "user/change_password",
        views.UserResetPasswordAPIView.as_view(),
        name="change_password",
    ),
]

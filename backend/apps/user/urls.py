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
    POST        /api/register
    POST        /api/login
    POST        /api/logout
    POST        /api/token/refresh
    POST        /api/token/verify
    GET, PUT    /api/user
    POST        /api/user/upload-image
    PUT         /api/user/change-password
"""

urlpatterns = [
    path("register/", views.UserRegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("logout/", TokenBlacklistView.as_view(), name="logout"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify", TokenVerifyView.as_view(), name="token_verify"),
    path(
        "user/",
        views.UserView.as_view(),
        name="user",
    ),
    path(
        "user/upload-image",
        views.UserImageUploadView.as_view(),
        name="user_upload_image",
    ),
    path(
        "user/change-password",
        views.UserResetPasswordView.as_view(),
        name="change_password",
    ),
]

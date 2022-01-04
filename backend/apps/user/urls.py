from django.urls import path

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
    path("user/register", views.UserRegisterView.as_view(), name="register"),
    path("user/login", views.DecoratedTokenObtainPairView.as_view(), name="login"),
    path("user/logout", views.DecoratedTokenBlacklistView.as_view(), name="logout"),
    path(
        "user/token/refresh",
        views.DecoratedTokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path(
        "user/token/verify",
        views.DecoratedTokenVerifyView.as_view(),
        name="token_verify",
    ),
    path(
        "user",
        views.UserView.as_view(),
        name="user",
    ),
    path(
        "user/upload-image",
        views.UserImageUploadView.as_view(),
        name="user_upload_image",
    ),
    path(
        "user/password",
        views.UserResetPasswordView.as_view(),
        name="change_password",
    ),
]

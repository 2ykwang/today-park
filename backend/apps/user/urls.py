from django.urls import path

from . import views

# EndPoints
"""
    POST        /api/user/register
    POST        /api/user/login
    POST        /api/user/logout
    POST        /api/user/token/refresh
    POST        /api/user/token/verify
    GET, PUT    /api/user
    POST        /api/user/upload-image
    PUT         /api/user/password
    
    POST         /api/user/check
"""

urlpatterns = [
    path("/register", views.UserRegisterView.as_view(), name="register"),
    path("/login", views.DecoratedTokenObtainPairView.as_view(), name="login"),
    path("/logout", views.DecoratedTokenBlacklistView.as_view(), name="logout"),
    path(
        "/token/refresh",
        views.DecoratedTokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path(
        "/token/verify",
        views.DecoratedTokenVerifyView.as_view(),
        name="token_verify",
    ),
    path(
        "",
        views.UserView.as_view(),
        name="user",
    ),
    path(
        "/upload-image",
        views.UserImageUploadView.as_view(),
        name="user_upload_image",
    ),
    path(
        "/password",
        views.UserResetPasswordView.as_view(),
        name="change_password",
    ),
    path(
        "/check",
        views.UserCheckAvailableView.as_view(),
        name="check",
    ),
]

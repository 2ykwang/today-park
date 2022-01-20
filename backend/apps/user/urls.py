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

app_name = "user"
urlpatterns = [
    path("/register", name="register", view=views.UserRegisterView.as_view()),
    path("/login", name="login", view=views.DecoratedTokenObtainPairView.as_view()),
    path("/logout", name="logout", view=views.DecoratedTokenBlacklistView.as_view()),
    path(
        "/token/refresh",
        name="token-refresh",
        view=views.DecoratedTokenRefreshView.as_view(),
    ),
    path(
        "/token/verify",
        name="token-verify",
        view=views.DecoratedTokenVerifyView.as_view(),
    ),
    path(
        "",
        name="info",
        view=views.UserView.as_view(),
    ),
    path(
        "/upload-image",
        name="upload-image",
        view=views.UserImageUploadView.as_view(),
    ),
    path(
        "/password",
        name="change-password",
        view=views.UserResetPasswordView.as_view(),
    ),
    path("/check", name="check", view=views.UserCheckAvailableView.as_view()),
]

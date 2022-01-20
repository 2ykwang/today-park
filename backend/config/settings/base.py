"""
Django settings for today-park project.

environment variables:
    SECRET_KEY = "secret key"

    MYSQL_DATABASE = "db name"
    MYSQL_USER = "db user"
    MYSQL_PASSWORD = "db password"
    MYSQL_HOST = "db host"
    MYSQL_PORT = 3306

    ALLOWED_HOSTS = https://aaa.com,https://bbb.com # 접속 허용할 hosts

    USE_SQLITE3 = 0 # SQLITE 사용 여부
"""


import os
from datetime import timedelta
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured


def get_env(key_name):
    try:
        return os.environ[key_name]
    except KeyError:
        if not os.environ["DJANGO_SETTINGS_MODULE"] == "config.settings.test":
            error_message = f"환경변수 {key_name}이 설정되어 있지 않습니다."
            print(error_message)
        # raise ImproperlyConfigured(error_message)


# ---------------------------------------------------------------------
# PATH
# ---------------------------------------------------------------------

# BASE_DIR = backend/
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# media
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, ".media")

# static
# django-admin collectstatic 생성 파일 저장 경로
STATIC_URL = "/staticfiles/"
STATIC_ROOT = os.path.join(BASE_DIR, ".static")

# 후행 슬래시 비활성화
APPEND_SLASH = False

# ---------------------------------------------------------------------
# SECURITY
# ---------------------------------------------------------------------

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# CORS
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True

ALLOWED_HOSTS = []

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",  # noqa
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# ---------------------------------------------------------------------
# APPS
# ---------------------------------------------------------------------

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",  # token blacklist
    "corsheaders",
    "drf_yasg",
]

LOCAL_APPS = ["apps.user", "apps.core", "apps.park", "apps.bookmark"]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS
# ---------------------------------------------------------------------
# MIDDLEWARE
# ---------------------------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# ---------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases
# SQLITE3 사용
if get_env("USE_SQLITE3") == "1":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": get_env("MYSQL_DATABASE"),
            "USER": get_env("MYSQL_USER"),
            "PASSWORD": get_env("MYSQL_PASSWORD"),
            "HOST": get_env("MYSQL_HOST"),
            "PORT": get_env("MYSQL_PORT"),
        }
    }

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

AUTH_USER_MODEL = "user.User"

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ---------------------------------------------------------------------
# Internationalization
# https://docs.djangoproject.com/ko/4.0/topics/i18n/
# ---------------------------------------------------------------------

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_TZ = True


# ---------------------------------------------------------------------
# Third-Party Settings
# ---------------------------------------------------------------------

# DJANGO_REST_FRAMEWORK 설정
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "EXCEPTION_HANDLER": "apps.core.exceptions.custom_exception_handler",
}

SWAGGER_SETTINGS = {
    "USE_SESSION_AUTH": False,
    "SECURITY_DEFINITIONS": {
        "api_key": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": "JWT authorization",
        }
    },
}

# DRF simplejwt 설정
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(hours=1),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}

# ---------------------------------------------------------------------
# CUSTOM SETTINGS
# ---------------------------------------------------------------------

USE_SWAGGER = True
# root path 접근시 redoc 으로 redirection
REDIRECT_TO_REDOC = True

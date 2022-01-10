from .base import *  # noqa F403
from .base import BASE_DIR, get_env

# heroku 배포를 위한 middleware 설정

MIDDLEWARE += [
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

STATIC_URL = "/static/"

USE_SWAGGER = True
ALLOWED_HOSTS = get_env("ALLOWED_HOSTS").split(",")

DEBUG = False

# flake8: noqa

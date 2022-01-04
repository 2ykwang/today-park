from .base import *  # noqa F403
from .base import BASE_DIR, get_env

DEBUG = True

ALLOWED_HOSTS = ["*"]

# debug toolbar
INTERNAL_IPS = ["127.0.0.1"]

# SQLITE3 사용
if get_env("USE_SQLITE3") == "1":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
  
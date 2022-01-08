from .base import *  # noqa F403
from .base import BASE_DIR, get_env

USE_SWAGGER = True
ALLOWED_HOSTS = get_env("ALLOWED_HOSTS").split(",")

DEBUG = False
# database ... cache ...

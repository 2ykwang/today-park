from .base import *  # noqa F403
from .base import env

ALLOWED_HOSTS = env.get("ALLOWED_HOSTS", default="*").split(",")

DEBUG = False
# database ... cache ...

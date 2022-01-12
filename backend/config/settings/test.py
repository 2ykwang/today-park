from .base import *  # noqa F403
from .base import BASE_DIR, get_env

SECRET_KEY = "ABCDEFG_TEST"

# MYSQL_DATABASE = "db name"
# MYSQL_USER = "db user"
# MYSQL_PASSWORD = "db password"
# MYSQL_HOST = "db host"
# MYSQL_PORT = 3306

ALLOWED_HOSTS = ["*"]  # 접속 허용할 hosts

USE_SQLITE3 = 1  # SQLITE 사용 여부

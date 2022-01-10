import multiprocessing
import os

is_heroku = os.environ.get("HEROKU_DEPLOY", default=0)

bind = ":8000"
workers = multiprocessing.cpu_count() if not is_heroku else 6
wsgi_app = "config.wsgi"

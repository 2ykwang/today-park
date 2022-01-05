import multiprocessing

bind = ":8000"
workers = multiprocessing.cpu_count()
wsgi_app = "config.wsgi"
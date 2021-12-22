#!/bin/bash

python manage.py makemigrations
python manage.py migrate

# TODO: 나중에 wsgi 사용 (gunicorn or uwsgi)
python manage.py runserver 0.0.0.0:8000
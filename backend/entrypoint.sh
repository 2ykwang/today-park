#!/bin/bash

python manage.py migrate

# collect static
python manage.py collectstatic --noinput

# gunicorn config 파일을 통한 실행
gunicorn -c config/gunicorn.conf.py
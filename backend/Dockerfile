FROM python:3.9-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /srv/app
 
COPY . /srv/app

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev zlib-dev jpeg-dev 

# ENV ALLOWED_HOSTS 127.0.0.1
ENV PORT 8000

# 의존성 설치
RUN pip install --upgrade pip
RUN pip install mysqlclient
RUN pip install -r requirements.txt
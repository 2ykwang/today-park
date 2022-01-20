FROM python:3.9-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV \
    # python
    PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    # poetry
    POETRY_VERSION=1.1.0 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR='/var/cache/pypoetry'

WORKDIR /srv/app
 
COPY . /srv/app

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev zlib-dev jpeg-dev libffi-dev

# ENV ALLOWED_HOSTS 127.0.0.1
ENV PORT 8000

# 의존성 설치
RUN pip install "poetry==$POETRY_VERSION"
RUN poetry install --no-dev --no-interaction --no-ansi
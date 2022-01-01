FROM node:16.13-alpine AS builder

WORKDIR /srv/client

# node... path에 추가
ENV PATH /srv/client/node_modules/.bin:$PATH

# 의존성 설치
COPY package.json /srv/client
COPY package-lock.json /srv/client
RUN npm install

# add app
COPY . /srv/client

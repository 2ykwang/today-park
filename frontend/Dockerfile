FROM node:16-alpine

WORKDIR /srv/client

# node... path에 추가
ENV PATH /srv/client/node_modules/.bin:$PATH

# 의존성 설치
COPY package.json /srv/client/package.json
COPY package-lock.json /srv/client/package-lock.json

RUN npm install
RUN npm install react-scripts@3.0.1 -g


# add app
# COPY . /srv/client

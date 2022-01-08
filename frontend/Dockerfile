FROM node:16-alpine
 
WORKDIR /srv/client 

COPY package*.json ./
COPY .env* ./

RUN yarn --production
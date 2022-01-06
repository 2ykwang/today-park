FROM node:16-alpine
 
WORKDIR /srv/client 

COPY package*.json ./
RUN yarn

ENV PATH /srv/tmp/node_modules/.bin:$PATH 
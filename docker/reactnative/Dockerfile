FROM node:16-alpine

WORKDIR /app

ADD . /app

RUN apk update && apk add bash

RUN npm install -g expo-cli

RUN npm install

#CMD ["npm","start"]

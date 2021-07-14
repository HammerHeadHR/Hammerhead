# syntax=docker/dockerfile:1
FROM node:12-alpine

RUN mkdir -p /home/app

COPY . /home/app

RUN npm install
RUN npx webpack -w

CMD ["node", "/home/app/index.js"]
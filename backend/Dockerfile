FROM node:alpine

RUN mkdir -p /backend
WORKDIR /backend

RUN npm install -g nodemon

COPY backend/package.json .
RUN npm install
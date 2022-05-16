#!/bin/bash
FROM node:latest

WORKDIR /app/server

COPY package.json ./
COPY tsconfig.json ./

COPY ./src ./src

RUN npm install
RUN npm run build

EXPOSE 8000

# RUN npm run start:dev

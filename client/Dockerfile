FROM node:latest as build-stage

WORKDIR /app/client

COPY package*.json ./
COPY tsconfig.json ./

COPY ./src ./src
COPY ./public ./public

COPY ./nginx.conf ./

RUN npm install
RUN npm run build


FROM nginx:latest

COPY --from=build-stage /app/client/build/ /usr/share/nginx/html
COPY --from=build-stage /app/client/nginx.conf /etc/nginx/conf.d/default.conf
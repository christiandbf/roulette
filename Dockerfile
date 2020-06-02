ARG NODE_ENV=development

FROM node:12.14.1-stretch-slim AS builder

WORKDIR /usr/src/app
COPY . .

RUN npm i -f --silent
RUN npm run tsc

FROM node:12.14.1-stretch-slim AS main

ARG NODE_ENV

WORKDIR /usr/src/app

COPY package* ./
RUN NODE_ENV=$NODE_ENV npm i -f --silent

COPY . .
COPY --from=builder ./usr/src/app/dist ./dist

CMD npm start
FROM node:12.14.1-alpine AS builder

WORKDIR /usr/src/app
COPY . .

RUN npm i --only=production
RUN npm run tsc

FROM node:12.14.1-alpine AS main

ARG NODE_ENV

WORKDIR /usr/src/app

COPY --from=builder ./usr/src/app/package* ./
COPY --from=builder ./usr/src/app/node_modules ./node_modules
COPY --from=builder ./usr/src/app/dist ./dist

CMD npm start
FROM node:18.15.0-alpine3.17 as tsc-builder

WORKDIR /usr/src/app

COPY ./src ./src
COPY tsconfig.json ./tsconfig.json
COPY package.json ./package.json

RUN npm install && npm run build

FROM node:18.15.0-alpine3.17

WORKDIR /usr/src/app

COPY --from=tsc-builder /usr/src/app/dist ./dist
COPY package.json ./package.json

RUN npm install --prod

EXPOSE 8080

CMD [ "node", "./dist/index.js" ]
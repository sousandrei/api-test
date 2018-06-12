FROM node:10.4.0-alpine

ENV ENV=${ENV}
ENV PORT=${PORT}
ENV POSTGRES_URL=${POSTGRES_URL}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_DATABASE=${POSTGRES_DATABASE}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV KNEX_DEBUG=${KNEX_DEBUG}
ENV PAGE_SIZE=${PAGE_SIZE}

WORKDIR /usr/src/api-test

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
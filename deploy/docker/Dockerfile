FROM node:17-slim

ENV NODE_OPTIONS=--max_old_space_size=2048

WORKDIR /app
COPY ./package.json ./
COPY ./ormconfig.json ./
COPY ./deploy/docker/entrypoint.sh /tmp/entrypoint.sh
COPY ./deploy/postgres/wait-for-postgres.sh /tmp/wait-for-postgres.sh

RUN apt-get update && \
    apt-get install -y \
    bash postgresql-client-13

RUN npm install
COPY . .
RUN npm install -g @nestjs/cli \
    && npm run build

EXPOSE 3000
# Build container with all devDependencies installed
FROM node:8-alpine AS build

# Install python and build dependencies for node-gyp
RUN apk add --no-cache \
        python \
        make \
        g++

WORKDIR /app

# Cached unless package*.json has changed
COPY package*.json /app/
RUN npm ci --production=false --silent

# Copy full app
COPY . /app

ENV \
  NODE_ENV="dev" \
  HOST="0.0.0.0" \
  PORT=4000

EXPOSE 4000

CMD ["node", "server.js"]

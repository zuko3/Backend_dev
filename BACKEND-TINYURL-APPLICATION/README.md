## SETUP FROM SCRATCH

# Setting Learna Backend Project

1. Create a folder named tinyurl-service
2. cd tinyurl-service
3. npx lerna init && npm install

# Modify package.json

```
    "workspaces": {
        "packages": [
        "apps/*",
        "libs/*"
        ]
    }
```

# To enable JS Module

"type": "module",

# Add apps

npx lerna create @tinyurl/auth-lib libs
npx lerna create @tinyurl/urls-lib libs
npx lerna create @tinyurl/tinyurl-app apps
npx lerna create @tinyurl/cronjob-app apps
npx lerna create @tinyurl/logger-app apps
npx lerna create @tinyurl/dbmigrate-app apps

# Install dependency

npm i fastify
npm i axios
npm i http-status-codes
npm i @fastify/postgres
npm i @fastify/autoload
npm i fastify-plugin

# Important packages

https://www.npmjs.com/package/axios
https://www.npmjs.com/package/http-status-codes
https://www.npmjs.com/package/@fastify/autoload
https://www.npmjs.com/package/@fastify/postgres
https://www.npmjs.com/package/fastify-plugin
https://www.npmjs.com/package/@fastify/http-proxy
https://github.com/fastify/fastify-http-proxy

# Fastify Http-proxy

- https://github.com/fastify/fastify-http-proxy
- https://www.npmjs.com/package/@fastify/http-proxy

# Additional package

https://www.npmjs.com/package/@fastify/request-context
https://www.npmjs.com/package/@fastify/error

# Add local dependency

```
 "dependencies": {
    "@tinyurl/auth-lib": "file:../../libs/@tinyurl/auth-lib",
    "@tinyurl/urls-lib": "file:../../libs/@tinyurl/urls-lib"
  }
```

# Start app with env file

```
 "scripts": {
    "start:dev": "node --env-file=.development.env apps/tinyurl-app/lib/server.js"
  }
```

npm run start:dev

# NOTES

encapsulate (optional) - Defaults to 'true', if set to 'false' each plugin loaded is wrapped with fastify-plugin. This allows you to share contexts between plugins and the parent context

```
fastify.register(autoLoad, {
  dir: path.join(__dirname, 'plugins'),
  encapsulate: false
})
```

# Loggging

https://www.npmjs.com/package/winston
https://www.npmjs.com/package/winston-transport

# DB MIGRATIONS

https://www.npmjs.com/package/postgrator

The files must follow the convention [version].[action].[optional-description].sql or [version].[action].[optional-description].js (or .mjs, .cjs)

# How to read environment variables from Node.js

https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs

# Define array of variable in env file

https://stackoverflow.com/questions/31552125/defining-an-array-as-an-environment-variable-in-node-js

# Route Prefixing

https://fastify.dev/docs/latest/Reference/Routes/#route-prefixing

# Install redis with docker

docker run -d --name redis -p 6379:6379 redis

# Sample Env file

host= 127.0.0.1
port= 5432
user= postgres
password= rahul
database= auth_app
connectionString= postgres://postgres:rahul@localhost/auth_app
NODE_ENV=development
ALLOWED_X_COM = x_url_serv,x_url_service
LOG_CHANNEL_NAME = "LOG_REDIS_CHANNEL"

# Run Migrations

npm run run:migration

# swagger

- identity service
  http://127.0.0.1:8001/documentation

- url service
  http://127.0.0.1:8002/documentation

# Retry mechanism for Connecting to postgres

Establishing a reliable connection to a PostgreSQL database within a Docker Compose setup often requires implementing retry mechanisms.

Health Checks: Docker Compose allows you to define health checks for containers. By configuring a health check for the PostgreSQL container, you can ensure that dependent services only start when the database is deemed healthy.

    services:
      db:
        image: postgres:latest
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U postgres"]
          interval: 10s
          timeout: 5s
          retries: 5
        ...
      web:
        ...
        depends_on:
          db:
            condition: service_healthy

# CURL Requests

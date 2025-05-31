## HOW TO GUIDE

# Setting lerna backend project

1. Create a folder named project_name
2. cd project_name
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

# Add learna Inside apps and libs folders

npx lerna create @project_name/auth-lib libs
npx lerna create @project_name/urls-lib libs

npx lerna create @project_name/cronjob-app apps
npx lerna create @project_name/logger-app apps
npx lerna create @project_name/dbmigrate-app apps

# Install dependency

npm i fastify
npm i axios
npm i http-status-codes
npm i @fastify/postgres
npm i @fastify/autoload
npm i fastify-plugin

# Important packages

- https://www.npmjs.com/package/axios
- https://www.npmjs.com/package/http-status-codes
- https://www.npmjs.com/package/@fastify/autoload
- https://www.npmjs.com/package/@fastify/postgres
- https://www.npmjs.com/package/fastify-plugin
- https://www.npmjs.com/package/@fastify/http-proxy
- https://github.com/fastify/fastify-http-proxy

# Fastify Http-proxy

- https://github.com/fastify/fastify-http-proxy
- https://www.npmjs.com/package/@fastify/http-proxy

# Additional package

- https://www.npmjs.com/package/@fastify/request-context
- https://www.npmjs.com/package/@fastify/error

# Add local dependency

```
 "dependencies": {
    "@tinyurl/auth-lib": "file:../../libs/@tinyurl/auth-lib",
    "@tinyurl/urls-lib": "file:../../libs/@tinyurl/urls-lib"
  }
```

# Start app with env file

Create a .development.env File

```
 "scripts": {
    "start:dev": "node --env-file=.development.env apps/lib/server.js"
  }
```

- npm run start:dev

# NOTES

encapsulate (optional) - Defaults to 'true', if set to 'false' each plugin loaded is wrapped with fastify-plugin. This allows you to share contexts between plugins and the parent context

```
fastify.register(autoLoad, {
  dir: path.join(__dirname, 'plugins'),
  encapsulate: false
})
```

# Loggging

- https://www.npmjs.com/package/winston
- https://www.npmjs.com/package/winston-transport

# DB MIGRATIONS

- https://www.npmjs.com/package/postgrator

The files must follow the convention [version].[action].[optional-description].sql or [version].[action].[optional-description].js (or .mjs, .cjs)

# How to read environment variables from Node.js

- https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs

# Define array of variable in env file

- https://stackoverflow.com/questions/31552125/defining-an-array-as-an-environment-variable-in-node-js

# Route Prefixing

https://fastify.dev/docs/latest/Reference/Routes/#route-prefixing

# Install redis with docker

docker run -d --name redis -p 6379:6379 redis

# Sample ENV file

```
host= 127.0.0.1
port= 5432
user= postgres
password= rahul
database= auth_app
NODE_ENV=development
ALLOWED_X_COM = x_url_serv,x_url_service
LOG_CHANNEL_NAME = "LOG_REDIS_CHANNEL"
```

# Run npm commands with Args

```
 "run:migration": "node --env-file .development.env libs/db-mgmt/lib/db-mgmt.js migrate do",
```

someFunc(process.argv[2], process.argv[3]);

- process.argv[2] === migrate
- process.argv[3] === do

# Retry mechanism for Connecting to postgres

Establishing a reliable connection to a PostgreSQL database within a Docker Compose setup often requires implementing retry mechanisms.

Health Checks: Docker Compose allows you to define health checks for containers. By configuring a health check for the PostgreSQL container, you can ensure that dependent services only start when the database is deemed healthy.

```
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

```

# Swagger Docs Link

- identity service
- http://127.0.0.1:8001/documentation

- url service
- http://127.0.0.1:8002/documentation

# Curl Requests

Url service Ping:

```
curl --request GET \
 --url http://127.0.0.1:8000/url-service/ping \
 --header 'User-Agent: insomnia/11.1.0'
```

Auth signUp:

```
curl --request POST \
 --url http://127.0.0.1:8000/auth-service/signup \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/11.1.0' \
 --data '{ "name":"Rahul kumar", "email":"rahul@gmail.com", "password":"password123" }'
```

Auth login:

```
curl --request POST \
 --url http://127.0.0.1:8000/auth-service/login \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/11.0.0' \
 --data '{
"email": "rahul@gmail.com",
"password": "password123"
}'
```

Url short:

```
curl --request POST \
 --url http://127.0.0.1:8000/url-service/short \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/10.3.0' \
 --data '{
"long*url":"https://www.amazon.in/l/29657746031/?_encoding=UTF8&pd_rd_w=6xDYc&content-id=amzn1.sym.f40d7b8b-b6c2-45d4-8bca-086ac17ffbc4&pf_rd_p=f40d7b8b-b6c2-45d4-8bca-086ac17ffbc4&pf_rd_r=F7YQ44DZHGPD9QPSQ419&pd_rd_wg=HpIRD&pd_rd_r=e99fd196-fb03-42c5-9338-965fa8434dd4&ref*=pd_hp_d_hero_unk",
"expiry_date": "2030-02-23T12:17:00Z"
}'
```

Url redirect:

```
curl --request GET \
 --url http://127.0.0.1:8000/url-service/eenA \
 --header 'User-Agent: insomnia/10.3.0' \
 --header 'x-com: aa'
```

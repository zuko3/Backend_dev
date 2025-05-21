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

# CURL REQUEST

curl --request GET \
 --url http://127.0.0.1:8000/api/v1/ping \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/9.3.3'

curl --request POST \
 --url http://127.0.0.1:8000/api/v1/url/short \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/10.3.0' \
 --header 'x-com: tiny-app' \
 --data '{
"long*url":"https://www.amazon.in/l/29657746031/?_encoding=UTF8&pd_rd_w=6xDYc&content-id=amzn1.sym.f40d7b8b-b6c2-45d4-8bca-086ac17ffbc4&pf_rd_p=f40d7b8b-b6c2-45d4-8bca-086ac17ffbc4&pf_rd_r=F7YQ44DZHGPD9QPSQ419&pd_rd_wg=HpIRD&pd_rd_r=e99fd196-fb03-42c5-9338-965fa8434dd4&ref*=pd_hp_d_hero_unk",
"expiry_date": "2030-02-23T12:17:00Z"
}'

curl --request GET \
 --url http://127.0.0.1:8000/api/v1/url/eenA \
 --header 'User-Agent: insomnia/10.3.0' \
 --header 'x-com: aa'

curl --request GET \
 --url http://127.0.0.1:8000/api/v1/auth/ping \
 --header 'User-Agent: insomnia/11.0.0' \
 --header 'x-com: some-orchestrator'

curl --request POST \
 --url http://127.0.0.1:8000/api/v1/auth/login \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/11.0.0' \
 --header 'x-com: some-orchestrator' \
 --data '{
"email": "test@gmail.com",
"password": "test123"
}'

# Install redis with docker

docker run -d --name redis -p 6379:6379 redis

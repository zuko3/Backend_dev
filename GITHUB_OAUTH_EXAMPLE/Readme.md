# Login with GitHub Oauth Implementation

"type": "module"

# Logging Type:

debug, info, warn, error, or fatal

# EXTRA NOTES

//////////////////////////////Error

- In async await you cant use done

- (node:6156) [FSTWRN002] FastifyWarning: The serverStatusRoutes plugin being registered mixes async and callback styles, which will result in an error in `fastify@5`

- https://blog.devgenius.io/server-side-development-with-fastify-route-level-hooks-and-decorators-226f283c64fb

# Uri concepts

```
 // For scope=user
  https://github.com/login/oauth/authorize?client_id=&response_type=code&scope=user
```

```
// Response
{
    user: {
        "login": "zuko3",
        "gravatar_id": "",
    }
}

```

```
    But as an alternative to logging out from GitHub upon logout from your application, you could require a renewed consent upon re-login to your application. If you have already been logged in once to your application via GitHub and then visit

    https://github.com/login/oauth/authorize?scope=user:email&client_id=...
    you are re-logged in silently.

    But if you visit

    https://github.com/login/oauth/authorize?scope=user:email&client_id=...&prompt=consent
    instead, the GitHub consent screen re-appears
```

# Urls to use

```
https://github.com/login/oauth/authorize?client_id=&response_type=code&scope=user

curl --request GET \
 --url http://127.0.0.1:8000/places \
 --header 'User-Agent: insomnia/11.1.0' \
 --header 'token: 1234'

curl --request POST \
 --url http://127.0.0.1:8000/add-place \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/11.1.0' \
 --header 'token: 1234' \
 --data '{
"name": "Njp",
"email": "rahul@gmail.com"
}'
```

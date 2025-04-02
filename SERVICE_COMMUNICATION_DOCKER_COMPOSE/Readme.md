# Host is important

```
await fastify.listen({ port: 8000, host: "0.0.0.0" });
```

When running a Node.js application inside a Docker container without specifying the host, external communication fails because the application binds to localhost (127.0.0.1) by default. This creates a networking isolation issue where the service becomes inaccessible from outside the container.

# PORT MAPPING

```
ports:
    - 3000:3000
```

# Access service one

```
await axios.get("http://service_one:3000/posts");
```

# Commands

```
docker compose up -d
```

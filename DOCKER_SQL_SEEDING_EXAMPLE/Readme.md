# Pre-seed the database by bind-mounting a SQL script in Docker

Let's see how to mount an SQL file directly into the Postgres containers’ initialization directory (/docker-entrypoint-initdb.d). The /docker-entrypoint-initdb.d is a special directory in PostgreSQL Docker containers that is used for initializing the database when the container is first started

- Modify the seed.sql with the following entries:

```
CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 name VARCHAR(50),
 email VARCHAR(100) UNIQUE
);

INSERT INTO users (name, email) VALUES
 ('Alpha', 'alpha@example.com'),
 ('Beta', 'beta@example.com'),
 ('Gamma', 'gamma@example.com')
ON CONFLICT (email) DO NOTHING;
```

- Docker file setings

```
FROM postgres:latest
COPY seed.sql /docker-entrypoint-initdb.d/
```

```
FROM mysql:latest
COPY init.sql /docker-entrypoint-initdb.d/
COPY data.sql /docker-entrypoint-initdb.d/
```

This Dockerfile copies the seed.sql script directly into the PostgreSQL container's initialization directory.

# Reference

https://docs.docker.com/guides/pre-seeding/

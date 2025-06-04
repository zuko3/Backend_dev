# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest


# Set environment variables for PostgreSQL
ENV POSTGRES_DB=myredisdb
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=docker

# Copy initialization SQL script and data SQL script to the container
COPY init.sql /docker-entrypoint-initdb.d/
# COPY data.sql /docker-entrypoint-initdb.d/

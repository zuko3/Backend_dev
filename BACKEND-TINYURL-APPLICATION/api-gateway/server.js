import Fastify from "fastify";
import proxy from "@fastify/http-proxy";

const server = Fastify({ logger: true });

// /api/x will be proxied to http://my-api.example.com/x
server.register(proxy, {
  upstream: "http://my-api.example.com",
  prefix: "/api", // optional
  http2: false, // optional
});

// /rest-api/123/endpoint will be proxied to http://my-rest-api.example.com/123/endpoint
server.register(proxy, {
  upstream: "http://my-rest-api.example.com",
  prefix: "/rest-api/:id/endpoint", // optional
  rewritePrefix: "/:id/endpoint", // optional
  http2: false, // optional
});

server.listen({ port: 8000, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    process.exit(1);
  }
});

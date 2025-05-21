import Fastify from "fastify";
import proxy from "@fastify/http-proxy";

const server = Fastify({ logger: true });

server.register(proxy, {
  upstream: "http://127.0.0.1:8001/identity-service/v1/",
  prefix: "/auth",
  http2: false,
});

server.register(proxy, {
  upstream: "http://127.0.0.1:8002/url-service/v1/",
  prefix: "/url",
  http2: false,
});

server.listen({ port: 8000, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

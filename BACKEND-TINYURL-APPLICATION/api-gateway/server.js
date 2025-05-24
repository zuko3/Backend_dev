import Fastify from "fastify";
import proxy from "@fastify/http-proxy";
import { publish } from "./publisher.js";

const server = Fastify({ logger: true });

server.addHook("onRequest", (request, reply, done) => {
  publish({
    type: "INFO",
    tag: "API_GATEWAY",
    metadata: {},
    sendLog: true,
  });
  done();
});

server.register(proxy, {
  upstream: "http://127.0.0.1:8001/identity-service/v1/",
  prefix: "/auth-service",
  http2: false,
  replyOptions: {
    rewriteRequestHeaders: (_originalReq, headers) => ({
      ...headers,
      "x-com": "x_auth",
    }),
  },
});

server.register(proxy, {
  upstream: "http://127.0.0.1:8002/url-service/v1/",
  prefix: "/url-service",
  http2: false,
  replyOptions: {
    rewriteRequestHeaders: (_originalReq, headers) => ({
      ...headers,
      "x-com": "x_url_service",
    }),
  },
});

server.listen({ port: 8000, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

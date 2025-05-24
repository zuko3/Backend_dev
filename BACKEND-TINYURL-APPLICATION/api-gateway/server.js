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
  upstream: `${process.env.IDENTITY_SERVICE_URL}/identity-service/v1/`,
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
  upstream: `${process.env.URL_SERVICE}/url-service/v1/`,
  prefix: "/url-service",
  http2: false,
  replyOptions: {
    rewriteRequestHeaders: (_originalReq, headers) => ({
      ...headers,
      "x-com": "x_url_service",
    }),
  },
});

server.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

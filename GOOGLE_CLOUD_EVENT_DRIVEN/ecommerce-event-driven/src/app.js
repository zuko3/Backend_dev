const Fastify = require("fastify");

function buildApp() {
  const app = Fastify({ logger: true });
  return app;
}

module.exports = buildApp;

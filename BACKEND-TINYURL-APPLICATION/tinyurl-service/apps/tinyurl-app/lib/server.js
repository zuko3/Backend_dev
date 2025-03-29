import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import fastifyPostgres from "@fastify/postgres";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { dbConfig } from "@tinyurl/urls-lib";
import logger from "@tinyurl/logger-app";
import customErrorPlugin from "./plugin/error-plugin.js";

const fastify = Fastify();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const URI = "/api";

fastify.decorateRequest("fastify", null);
fastify.addHook("onRequest", async (req) => {
  req.fastify = fastify;
});

if (!global.log) {
  global.log = logger;
}

fastify.register(customErrorPlugin);
fastify.register(fastifyPostgres, dbConfig);

fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
  options: { prefix: URI },
});

fastify.listen({ port: 8000, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  global.log.info(`[runApp][App is running]`, {
    metadata: "",
    sendLog: true,
  });
  fastify.log.info(`Server listening at ${address}`);
});

import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { dbConfig } from "./configs/dbconfig.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import errorPlugin from "./plugin/error-plugin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

//This adds pg instance to fastify
fastify.register(fastifyPostgres, dbConfig);

fastify.register(errorPlugin);

fastify.decorateRequest("fastify", null);
fastify.addHook("onRequest", async (req) => {
  req.fastify = fastify;
});

fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi, {
  theme: {
    title: "url service swagger",
  },
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
  },
});

fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
  options: { prefix: "/url-service" },
});

try {
  await fastify.listen({ port: 8002, host: "127.0.0.1" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

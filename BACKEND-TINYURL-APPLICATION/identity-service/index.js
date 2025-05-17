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
fastify.register(fastifyPostgres, dbConfig);
fastify.register(errorPlugin);

fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi, {
  theme: {
    title: "Auth service swagger",
  },
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
  },
});

fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
  options: { prefix: "/identity-service" },
});

fastify.listen({ port: 8001, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});

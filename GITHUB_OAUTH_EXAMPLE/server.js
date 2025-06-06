import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { fastifyRequestContext } from "@fastify/request-context";
import { loggerConfigDev, loggerConfigProd } from "./loggerConfig.js";
import { dbConfiguration } from "./dbConfig.js";
import { homeRoutes, authRoutes } from "./route.js";
import { validateToken } from "./validators.js";

const fastify = Fastify({
  logger: process.env.env_mode === "DEV" ? loggerConfigDev : loggerConfigProd,
});

/**
 * Add validateToken to fastify instance
 */
fastify.decorate("validateToken", validateToken);

/**
 * Add postgress to fastify instance with confs
 */
fastify.register(fastifyPostgres, dbConfiguration);

/**
 * request context for sharing data between context
 */
fastify.register(fastifyRequestContext, {
  defaultStoreValues: {
    user: {
      name: "",
      email: "",
      password: "",
    },
  },
});

/**
 * Add fastify instance to the request
 */
fastify.decorateRequest("fastify", null);
fastify.addHook("onRequest", async (req) => {
  req.fastify = fastify;
});

fastify.register(authRoutes);
fastify.register(homeRoutes);

async function startServer() {
  try {
    await fastify.listen({ port: 8000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();

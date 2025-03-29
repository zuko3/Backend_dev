import handleRedirect from "../handler/handle-redirect.js";
import handleShorten from "../handler/handle-shorten.js";
import { shortnerSchema, redirectSchema } from "../schema/index.js";

export default async function (fastify) {
  fastify.route({
    method: "POST",
    url: "/short",
    preHandler: [],
    schema: shortnerSchema,
    handler: handleShorten,
  });

  fastify.route({
    method: "GET",
    url: "/:short_key",
    preHandler: [],
    schema: redirectSchema,
    handler: handleRedirect,
  });
}

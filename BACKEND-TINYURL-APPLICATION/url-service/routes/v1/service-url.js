import handleRedirect from "../../handler/handle-redirect.js";
import handleShorten from "../../handler/handle-shorten.js";
import { shortner_schema, redirect_schema } from "../../schema.js";

export default async function (fastify) {
  fastify.route({
    method: "POST",
    url: "/short",
    preHandler: [],
    schema: shortner_schema,
    handler: handleShorten,
  });

  fastify.route({
    method: "GET",
    url: "/:short_key",
    preHandler: [],
    schema: redirect_schema,
    handler: handleRedirect,
  });
}

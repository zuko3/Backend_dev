import healthCheck from "../../handler/index.js";

export default async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/ping",
    handler: healthCheck,
  });
}

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { verifyApplicationUnitPreHandler } from "../../validator.js";
import { healthCheckJsonSchema } from "../../schema.js";

export default async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/ping",
    preHandler: [verifyApplicationUnitPreHandler],
    schema: healthCheckJsonSchema,
    handler: async function (_request, reply) {
      return reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK });
    },
  });
}

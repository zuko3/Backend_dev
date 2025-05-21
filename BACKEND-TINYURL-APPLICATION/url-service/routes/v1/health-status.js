import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { health_check } from "../../schema.js";
import { verifyApplicationUnit } from "../../validator.js";
import { publish } from "../../publisher.js";

export default async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/ping",
    preHandler: [verifyApplicationUnit],
    schema: health_check,
    handler: async function (_request, reply) {
      publish({ msg: "hello redis" });
      return reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK });
    },
  });
}

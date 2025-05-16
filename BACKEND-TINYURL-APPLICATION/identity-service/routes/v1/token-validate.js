import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { validateTokenJsonSchema } from "../../schema.js";
import { verifyApplicationUnitPreHandler } from "../../validator.js";

export default async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/validate",
    preHandler: [verifyApplicationUnitPreHandler],
    schema: validateTokenJsonSchema,
    handler: async function (request, reply) {
      const token = request?.headers?.["x-auth-token"];
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);
        return reply
          .status(StatusCodes.OK)
          .send({ email: decodedToken?.email });
      } catch (err) {
        throw new Error(err);
      }
    },
  });
}

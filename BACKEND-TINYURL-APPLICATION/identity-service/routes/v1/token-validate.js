import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { validate_token } from "../../schema.js";
import { verifyApplicationUnit, verifyToken } from "../../validator.js";

export default async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/validate",
    preHandler: [verifyApplicationUnit, verifyToken],
    schema: validate_token,
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

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { log_in, sign_up } from "../../schema.js";
import { verifyApplicationUnit } from "../../validator.js";
import { publish } from "../../publisher.js";

export default async function (fastify) {
  fastify.route({
    method: "POST",
    url: "/signup",
    preHandler: [verifyApplicationUnit],
    schema: sign_up,
    handler: async function (request, reply) {
      let client = null;
      try {
        client = await fastify.pg.connect();
        const { name, email, password } = request.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await client.query(
          "INSERT into users (name, email, password) VALUES($1,$2,$3) RETURNING email,name",
          [name, email, hashedPassword]
        );
        const response = {
          user: { email: email, name: name },
          message: ReasonPhrases.CREATED,
        };
        publish({
          type: "INFO",
          tag: "AUTH_SERVICE",
          metadata: {
            url: "/signup",
            handler: "signupHandler",
          },
          sendLog: true,
        });
        return reply.status(StatusCodes.CREATED).send(response);
      } catch (err) {
        publish({
          type: "INFO",
          tag: "AUTH_SERVICE",
          metadata: {
            url: "/signup",
            handler: "signupHandler",
            error: err,
          },
          sendLog: true,
        });
        throw new Error(err);
      } finally {
        client?.release();
      }
    },
  });

  fastify.route({
    method: "POST",
    url: "/login",
    preHandler: [verifyApplicationUnit],
    schema: log_in,
    handler: async function (request, reply) {
      let client = null;
      try {
        client = await fastify.pg.connect();
        const { email, password } = request.body;
        const { rows } = await client.query(
          "SELECT name, email, password from users where email=$1",
          [email]
        );
        if (rows?.length === 0) {
          throw new Error(ReasonPhrases.NOT_FOUND);
        }
        const [user] = rows;
        const isPasswordMatched = await bcrypt.compare(
          password,
          user?.password
        );
        if (!isPasswordMatched) {
          throw new Error(ReasonPhrases.UNAUTHORIZED);
        }
        const authToken = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRETE,
          {
            expiresIn: 300000000,
          }
        );
        const response = {
          user: { email: user.email, name: user.name },
          authToken,
        };
        publish({
          type: "INFO",
          tag: "AUTH_SERVICE",
          metadata: {
            url: "/login",
            handler: "loginHandler",
          },
          sendLog: true,
        });
        return reply.status(StatusCodes.OK).send(response);
      } catch (err) {
        throw new Error(err);
      } finally {
        client?.release();
      }
    },
  });
}

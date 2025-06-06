import axios from "axios";
import { validateToken } from "./validators.js";
import { handleLogin, handleSignUp } from "./authHandler.js";

async function homeRoutes(fastify, _options) {
  /**
   * Get places
   */
  fastify.route({
    method: "GET",
    url: "/places",
    /**
     * using validator from inernal fastifyify instance
     */
    preHandler: [fastify.validateToken],
    handler: async function (request, reply) {
      const client = await fastify.pg.connect();
      try {
        const { rows } = await client.query("SELECT * from places");
        const hydratedRows = rows.map(function (row) {
          return {
            ...row,
            country: "India",
          };
        });
        return reply.status(200).send({ data: hydratedRows });
      } catch (err) {
        request.log.error(err);
        return reply
          .status(500)
          .send({ statusCode: 500, error: "Internal Server Error" });
      } finally {
        client.release();
      }
    },
  });
  /**
   * Add places
   */
  fastify.route({
    method: "POST",
    url: "/add-place",
    /**
     * using validator from external file
     */
    preHandler: [validateToken],
    handler: async function (request, reply) {
      const client = await fastify.pg.connect();
      try {
        const { name, email } = request.body;
        const { rows } = await client.query(
          "INSERT into places (name, email) VALUES($1,$2) RETURNING name",
          [name, email]
        );
        request.log.info("place created");
        return reply
          .status(201)
          .send({ place: rows, message: "place created" });
      } catch (err) {
        request.log.error(err);
        return reply
          .status(500)
          .send({ statusCode: 500, error: "Internal Server Error" });
      } finally {
        client.release();
      }
    },
  });
}

async function authRoutes(fastify, _options) {
  /**
   * Oauth handle for login and oauth signup
   */
  fastify.route({
    method: "GET",
    url: "/oauth/callback",
    handler: async function (request, reply) {
      const client = await fastify.pg.connect();
      try {
        // Get the code from the query string from the success callback url
        const { code } = request?.query;
        if (!code) {
          throw new Error("Internal Server Error");
        }

        request.log.info("oauth:: code received");

        //Get the acess token using the code received
        const tokenResponse = await axios.get(
          process.env.github_access_token_url,
          {
            params: {
              client_id: process.env.client_id,
              client_secret: process.env.client_secret,
              code: code,
              redirect_uri: process.env.redirect_uri,
            },
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "application/json",
            },
          }
        );

        const access_token = tokenResponse?.data?.access_token;
        if (!access_token) {
          throw new Error("Internal Server Error");
        }

        request.log.info("oauth:: access token received");

        //Get the user details using the access token
        const userResponse = await axios.get(process.env.github_user_profile, {
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        const user = userResponse?.data;
        if (!user) {
          throw new Error("Internal Server Error");
        }

        const { email, name } = user;

        request.log.info("ouath:: login success");

        //Make new entry in db for new user else return the logged in user from oauth
        const { rows } = await client.query(
          "SELECT name, email from users where email=$1",
          [email]
        );
        request.requestContext.set("user", {
          name,
          email,
          password: "temppassword",
        });
        if (rows?.length === 0) {
          return handleSignUp(request, reply);
        }
        return handleLogin(request, reply);
      } catch (err) {
        request.log.error(err);

        return reply
          .status(500)
          .send({ statusCode: 500, error: "Internal Server Error" });
      } finally {
        client.release();
      }
    },
  });
}

export { homeRoutes, authRoutes };

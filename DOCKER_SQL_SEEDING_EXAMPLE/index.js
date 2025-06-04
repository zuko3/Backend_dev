import { createClient } from "redis";
import Fastify from "fastify";
import axios from "axios";
import { subscribePlugin } from "./subscriber.js";
import { publisher } from "./publisher.js";
import fastifyPostgres from "@fastify/postgres";

const fastify = Fastify({
  logger: true,
});

const client = createClient(6379, "127.0.0.1");

fastify.register(fastifyPostgres, {
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
});

fastify.register(subscribePlugin);

fastify.get("/db-status", function (req, reply) {
  fastify.pg.query(
    "SELECT * FROM request_status",
    null,
    function onResult(err, result) {
      if (err) {
        return reply.status(500).send({ err });
      } else {
        const response = result.rows.reduce(function (acc, value, index) {
          const { x_com, count } = value;
          if (acc[x_com]) {
            acc[x_com] = acc[x_com] + count;
          } else {
            acc[x_com] = count;
          }
          return acc;
        }, {});
        return reply.status(200).send(response);
      }
    }
  );
});

fastify.addHook("onRequest", (request, _reply, done) => {
  const x_com = request.headers["x-com"];
  publisher({ x_com });
  done();
});

fastify.route({
  method: "GET",
  url: "/api/ping",
  handler: async (_request, reply) => {
    return reply.status(200).send({ status: "ok" });
  },
});

fastify.route({
  method: "GET",
  url: "/api/post/:id",
  handler: async (request, reply) => {
    const { id } = request.params;
    const post = await client.get(id);
    if (post) {
      return reply.status(200).send({ post: JSON.parse(post), cached: true });
    } else {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const post = response?.data;
      const status = await client.setEx(
        id,
        3600,
        JSON.stringify(response?.data)
      );
      return reply.status(200).send({ post, cached: false, status });
    }
  },
});

try {
  client.on("error", function (err) {
    console.log("Redis Error !!!!!", err);
  });
  client.on("connect", function () {
    console.log("Redis Connected .....");
  });
  await client.connect();
  await fastify.listen({ port: 8000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

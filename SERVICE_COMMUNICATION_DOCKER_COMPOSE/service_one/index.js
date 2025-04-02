import Fastify from "fastify";
import axios from "axios";

const fastify = Fastify({
  logger: true,
});

fastify.get("/ping", async (request, reply) => {
  reply.status(200).send({ msg: "ok" });
});

fastify.get("/posts", async (request, reply) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  reply.status(200).send(data);
});

(async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.logger.err(err);
    process.exit(1);
  }
})();

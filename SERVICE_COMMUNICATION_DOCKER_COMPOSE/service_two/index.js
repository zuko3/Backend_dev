import Fastify from "fastify";
import axios from "axios";

const fastify = Fastify({
  logger: true,
});

fastify.get("/ping", async (request, reply) => {
  try {
    const response = await axios.get("http://service_one:3000/ping");
    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      return reply.status(200).send({ msg: response.data });
    }
    return reply.status(response.status).send({ msg: response.statusText });
  } catch (err) {
    throw err;
  }
});

fastify.get("/posts", async (request, reply) => {
  try {
    const response = await axios.get("http://service_one:3000/posts");
    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      return reply.status(200).send({ data: response.data });
    }
    return reply.status(response.status).send({ msg: response.statusText });
  } catch (err) {
    throw err;
  }
});

(async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
  } catch (err) {
    fastify.logger.err(err);
    process.exit(1);
  }
})();

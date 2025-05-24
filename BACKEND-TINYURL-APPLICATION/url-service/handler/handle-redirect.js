import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { publish } from "../publisher.js";

export default async function (request, reply) {
  let client = null;
  try {
    client = await request.fastify.pg.connect();
    const { short_key } = request.params;
    const { rows } = await client.query(
      "SELECT long_url from tableurls where short_url=$1",
      [short_key]
    );
    if (rows?.length === 0) {
      publish({
        type: "WARN",
        tag: "URL_SERVICE",
        metadata: {
          service: "url-service",
          url: "/:short_key",
          handler: "handleRedirect",
          short_key: short_key,
        },
        sendLog: true,
      });
      return reply.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    publish({
      type: "INFO",
      tag: "URL_SERVICE",
      metadata: {
        url: "/:short_key",
        handler: "handleRedirect",
        short_key: short_key,
        long_url: rows[0].long_url,
      },
      sendLog: true,
    });
    reply.status(StatusCodes.PERMANENT_REDIRECT).redirect(rows[0].long_url);
  } catch (err) {
    publish({
      type: "ERROR",
      tag: "URL_SERVICE",
      metadata: {
        url: "/:short_key",
        handler: "handleRedirect",
        err: err,
      },
      sendLog: true,
    });
    throw err;
  } finally {
    client?.release();
  }
}

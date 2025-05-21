import { StatusCodes, ReasonPhrases } from "http-status-codes";

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
      // global.log.error(`ERR_NOTFOUND`, {
      //   metadata: {
      //     StatusCodes: StatusCodes.NOT_FOUND,
      //     message: ReasonPhrases.NOT_FOUND,
      //   },
      //   sendLog: true,
      // });
      return reply.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    // global.log.info(`SUCEESS_FOUND`, {
    //   metadata: {
    //     short_key,
    //     longurl: rows[0].long_url,
    //   },
    //   sendLog: true,
    // });
    reply.status(StatusCodes.PERMANENT_REDIRECT).redirect(rows[0].long_url);
  } catch (err) {
    // global.log.error(`ERR`, {
    //   metadata: {
    //     error: err,
    //   },
    //   sendLog: true,
    // });
    throw err;
  } finally {
    client?.release();
  }
}

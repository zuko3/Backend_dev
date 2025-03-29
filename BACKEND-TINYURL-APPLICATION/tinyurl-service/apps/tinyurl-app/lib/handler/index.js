import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default async function (request, reply) {
  global.log.info(`Ping status /api/v1/ping`, {
    metadata: { message: ReasonPhrases.OK },
    sendLog: true,
  });
  reply.status(StatusCodes.OK).send({ message: ReasonPhrases.OK });
}

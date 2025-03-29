import fp from "fastify-plugin";

export default fp(function (fastify, option, done) {
  fastify.setErrorHandler(function (error, _request, reply) {
    const statusCode = error.statusCode;
    const { validation, validationContext } = error;

    if (validation) {
      global.log.error(`ERR_VALIDATION`, {
        metadata: {
          message: `A validation error occurred when validating the ${validationContext}`,
        },
        sendLog: true,
      });

      return reply.status(statusCode).send({
        statusCode,
        code: "ERR_VALIDATION",
        message: `A validation error occurred when validating the ${validationContext}...`,
        errors: validation,
      });
    }

    global.log.error(`ERR`, {
      metadata: { message: error.message, statusCode },
      sendLog: true,
    });

    reply.status(statusCode).send({
      statusCode: statusCode,
      message: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  });
  done();
});

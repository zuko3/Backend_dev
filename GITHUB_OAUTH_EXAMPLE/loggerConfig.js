//pino-pretty is used only for the development envirovment
//For prod use the plain logs with the serializer and redact

const loggerConfigDev = {
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
  redact: ["req.headers['postman-token']", "req.headers.token"],
  serializers: {
    res(reply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(request) {
      return {
        method: request.method,
        url: request.url,
        path: request.routeOptions.url,
        parameters: request.params,
        headers: request.headers,
      };
    },
  },
};

const loggerConfigProd = {
  level: "info",
  file: "application.log",
  redact: ["req.headers['postman-token']", "req.headers.token"],
  serializers: {
    res(reply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(request) {
      return {
        method: request.method,
        url: request.url,
        path: request.routeOptions.url,
        parameters: request.params,
        headers: request.headers,
      };
    },
  },
};

export { loggerConfigDev, loggerConfigProd };

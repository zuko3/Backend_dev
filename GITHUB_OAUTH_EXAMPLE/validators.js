import jwt from "jsonwebtoken";

async function validateToken(request, reply) {
  const token = request?.headers?.token;
  if (!token) {
    return reply.status(401).send({
      statusCode: 401,
      error: "Authorization  required in header",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.secret);
    request.user = {
      email: decodedToken.email,
    };
  } catch (err) {
    request.log.error(err);
    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
    });
  }
}

export { validateToken };

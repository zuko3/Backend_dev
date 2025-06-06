import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function handleLogin(request, reply) {
  const client = await request?.fastify?.pg?.connect();
  try {
    const { email, password } = request.requestContext.get("user");
    const { rows } = await client.query(
      "SELECT name, email, password from users where email=$1",
      [email]
    );
    if (rows?.length === 0) {
      return reply.status(404).send({
        statusCode: 404,
        message: "user not found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      rows?.[0]?.password
    );
    if (!isPasswordMatched) {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
      });
    }
    const response = {
      user: { email: rows?.[0]?.email, name: rows?.[0]?.name },
      message: "success",
    };

    const token = jwt.sign({ email: rows?.[0]?.email }, process.env.secret, {
      expiresIn: 30000,
    });

    return reply.status(200).send({ ...response, token });
  } catch (err) {
    request.log.error(err);
    return reply
      .status(500)
      .send({ statusCode: 500, error: "Internal Server Error" });
  } finally {
    client.release();
  }
}

async function handleSignUp(request, reply) {
  const client = await request?.fastify?.pg.connect();
  try {
    const { name, email, password } = request.requestContext.get("user");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await client.query(
      "INSERT into users (name, email, password) VALUES($1,$2,$3) RETURNING email,name",
      [name, email, hashedPassword]
    );

    request.log.info("user created");

    return reply.status(201).send({
      user: { email: email, name: name },
      message: "user created",
    });
  } catch (err) {
    request.log.error(err);
    return reply
      .status(500)
      .send({ statusCode: 500, error: "Internal Server Error" });
  } finally {
    client.release();
  }
}

export { handleLogin, handleSignUp };

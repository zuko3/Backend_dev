import {
  healthCheckSchema,
  loginSchema,
  signupSchema,
  validateTokenSchema,
} from "../schema/index.js";
import {
  healthCheck,
  handleLogin,
  handleSignUp,
  validateAuthToken,
} from "../handler/index.js";

export default async function (fastify) {
  fastify.get("/ping", { schema: healthCheckSchema }, healthCheck);
  fastify.post("/login", { schema: loginSchema }, handleLogin);
  fastify.post("/signup", { schema: signupSchema }, handleSignUp);
  fastify.get("/validate", { schema: validateTokenSchema }, validateAuthToken);
}

import authLib from "@tinyurl/auth-lib";
import { urlsLib } from "@tinyurl/urls-lib";

export default async function (fastify) {
  fastify.register(authLib, { prefix: "/auth" });
  fastify.register(urlsLib, { prefix: "/url" });
}

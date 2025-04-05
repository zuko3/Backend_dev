import axios from "axios";
import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

const swaggerOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Pagination example",
      description: "Backend for the pagination example",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
    tags: [
      { name: "Pagination", description: "pagination" },
      { name: "Ping", description: "ping" },
    ],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

await fastify.register(fastifySwagger, swaggerOptions);
await fastify.register(fastifySwaggerUi, swaggerUiOptions);
await fastify.register(cors, {
  origin: "*",
  methods: ["GET"],
});

async function handlePagination(request, reply) {
  const {
    query: { page = 1, limit = 10 },
  } = request;

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const pageCount = Math.ceil(data.length / parseInt(limit));
  const totalCount = data.length;
  const paginationData = data.slice(startIndex, endIndex);

  reply.send({
    posts: paginationData,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pageCount,
      totalCount,
    },
  });
}

fastify.get(
  "/ping",
  {
    schema: {
      description: "Ping",
      tags: ["Ping"],
      summary: "Check status",
    },
  },
  async (request, reply) => {
    reply.send({ status: "OK" });
  }
);

fastify.get(
  "/status",
  {
    schema: {
      description: "status",
      tags: ["Ping"],
      summary: "Check status",
    },
  },
  async (request, reply) => {
    reply.send({ status: "OK" });
  }
);

fastify.get(
  "/data",
  {
    schema: {
      description: "Get Pagination comments",
      tags: ["Pagination"],
      summary: "Get Pagination comments",
      querystring: {
        type: "object",
        properties: {
          page: { type: "integer", minimum: 1, default: 1 },
          limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
        },
        required: [],
      },
      response: {
        200: {
          type: "object",
          properties: {
            posts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  postId: { type: "integer" },
                  id: { type: "integer" },
                  name: { type: "string" },
                  email: { type: "string" },
                  body: { type: "string" },
                },
                required: ["postId", "id", "name", "email", "body"],
              },
            },
            pagination: {
              type: "object",
              properties: {
                page: { type: "integer" },
                limit: { type: "integer" },
                pageCount: { type: "integer" },
                totalCount: { type: "integer" },
              },
              required: ["page", "limit", "pageCount", "totalCount"],
            },
          },
          required: ["posts", "pagination"],
        },
      },
    },
  },
  handlePagination
);

(async () => {
  try {
    await fastify.listen({ port: 8000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

const validateTokenJsonSchema = {
  headers: {
    type: "object",
    properties: {
      "x-auth-token": { type: "string" },
      "x-com": { type: "string" },
    },
    required: ["x-auth-token", "x-com"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        email: { type: "string" },
      },
    },
  },
};

const signupJsonSchema = {
  headers: {
    type: "object",
    properties: {
      "x-com": { type: "string" },
    },
    required: ["x-com"],
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: {
        type: "string",
        format: "email",
      },
      password: { type: "string" },
    },
    required: ["name", "email", "password"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            email: { type: "string" },
            name: { type: "string" },
          },
        },
        message: { type: "string" },
      },
    },
  },
};

const loginJsonSchema = {
  headers: {
    type: "object",
    properties: {
      "x-com": { type: "string" },
    },
    required: ["x-com"],
  },
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      password: { type: "string" },
    },
    required: ["email", "password"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            email: { type: "string" },
            name: { type: "string" },
          },
        },
        authToken: { type: "string" },
      },
    },
  },
};

const healthCheckJsonSchema = {
  headers: {
    type: "object",
    properties: {
      "x-com": { type: "string" },
    },
    required: ["x-com"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export {
  validateTokenJsonSchema,
  signupJsonSchema,
  loginJsonSchema,
  healthCheckJsonSchema,
};

const headerSchema = {
  headers: {
    type: "object",
    properties: {
      "x-com": { type: "string" },
    },
    required: ["x-com"],
  },
};

const healthCheckSchema = {
  ...headerSchema,
  response: {
    "2xx": {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const loginSchema = {
  ...headerSchema,
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

const validateTokenSchema = {
  headers: {
    ...headerSchema.headers,
    properties: {
      ...headerSchema.headers.properties,
      "x-auth-token": { type: "string" },
    },
    required: [...headerSchema.headers.required, "x-auth-token"],
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

const signupSchema = {
  ...headerSchema,
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

export { healthCheckSchema, loginSchema, signupSchema, validateTokenSchema };

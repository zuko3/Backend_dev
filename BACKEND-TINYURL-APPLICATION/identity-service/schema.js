const validate_token = {
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

const sign_up = {
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

const log_in = {
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

const health_check = {
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

export { validate_token, sign_up, log_in, health_check };

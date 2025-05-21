const shortner_schema = {
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
      long_url: { type: "string" },
      expiry_date: { type: "string" },
    },
    required: ["long_url"],
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        short_url: { type: "string" },
        long_url: { type: "string" },
        expiry_date: { type: "string" },
        created_at: { type: "string" },
      },
    },
  },
};

const redirect_schema = {
  headers: {
    type: "object",
    properties: {
      "x-com": { type: "string" },
    },
    required: ["x-com"],
  },
  params: {
    type: "object",
    properties: {
      short_key: { type: "string" },
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

export { redirect_schema, shortner_schema, health_check };

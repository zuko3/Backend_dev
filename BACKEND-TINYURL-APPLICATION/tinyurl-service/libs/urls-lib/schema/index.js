const headerSchema = {
  headers: {
    type: "object",
    properties: {
      "x-com": { type: "string" },
    },
    required: ["x-com"],
  },
};

const shortnerSchema = {
  ...headerSchema,
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

const redirectSchema = {
  ...headerSchema,
  params: {
    type: "object",
    properties: {
      short_key: { type: "string" },
    },
  },
};

export { shortnerSchema, redirectSchema };

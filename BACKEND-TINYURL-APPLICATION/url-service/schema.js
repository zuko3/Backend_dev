const redirect_schema = {
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

const shortner_schema = {
  params: {
    type: "object",
    properties: {
      short_key: { type: "string" },
    },
  },
};

export { redirect_schema, shortner_schema };

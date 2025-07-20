# Validation & Serialization

## 1. Validation in Fastify

Validation in Fastify ensures that the incoming data(e.g., request payload, query parameters, headers, etc.) Follows predefined schema. Fastify uses **JSON Schema** for validation.

The validation happens automatically before the route handler is executed.
If the data is invalid, Fastify will return a response with a 400 status code and an error message detailing what went wrong.

```javascript
const fastify = require("fastify")();

// Define a schema for the request body
const schema = {
  body: {
    type: "object",
    required: ["name", "age"],
    properties: {
      name: {
        type: "string",
      },
      age: {
        type: "integer",
        minimum: 18,
      },
    },
  },
};

fastify.post(
  "/user",
  {
    schema,
  },
  async (request, reply) => {
    const { name, age } = request.body;
    return {
      name,
      age,
    };
  }
);

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at $ {address}`);
});
```

## 2. Serialization in Fastify

Serialization refers to the process of transforming data into a format suitable for transmission over a network, commonly in JSON format.
Fastify uses the **JSON Schema** to control how the response data is serialized.

```javascript
const fastify = require("fastify")();

// Define the response schema
const responseSchema = {
  200: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      age: {
        type: "integer",
      },
    },
  },
};

fastify.get(
  "/user",
  {
    schema: {
      response: responseSchema,
    },
  },
  async (request, reply) => {
    const user = {
      name: "Alice",
      age: 25,
    };
    return user; // This will be serialized according to the response schema no extra field will be send over network
  }
);

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
```

## 3. Custom Serialization

Fastify allows you to create custom serializers, gives more control over the response format.
This is especially useful when you want to filter out sensitive data or add custom transformations before the response is sent.

```javascript
const fastify = require("fastify")();

// Custom serializer for a specific type
fastify.setSerializerCompiler((schema) => {
  return (data) => JSON.stringify(data); // Custom serialization logic
});

fastify.get("/user", async (request, reply) => {
  const user = {
    name: "Alice",
    age: 25,
  };
  return user; // Will use the custom serializer
});

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
```

## 4. Key Points

- Validation ensures incoming data is correct according to a predefined schema, using JSON Schema.
- Serialization controls how response data is converted into JSON or other formats before sent to the client.
- Fastify provides an efficient, automatic way to handle both validation and serialization, also allows for customization when needed.

## 5. Some Schema Based Example

```javascript
const fastify = require("fastify")({
  logger: true,
  ajv: {
    strict: false,
  },
});
const userSchema = {
  type: "object",
  required: ["username"],
  properties: {
    username: {
      type: "string",
      minLength: 3,
      maxLength: 20,
      description: "A unique username for the user",
      example: "john_doe",
    },
  },
  additionalProperties: false, // Prevents additional fields
  description: "Schema for user registration",
  title: "User Registration Schema",
  example: {
    username: "john_doe",
  },
};

fastify.post(
  "/register",
  {
    schema: {
      body: userSchema,
      summary: "Register a new user",
      tags: ["User Management", "Authentication"],
    },
  },
  async (request, reply) => {
    const { username } = request.body;
    return {
      message: "User registered successfully",
      user: {
        username,
      },
    };
  }
);

// Custom error handler
fastify.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: error.message,
      validation: error.validation,
    });
  } else {
    reply.send(error);
  }
});

// Declare a route
fastify.get("/", function handler(request, reply) {
  reply.send({
    hello: "world",
  });
});

// Run the server!
fastify.listen(
  {
    port: 3000,
  },
  (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
```

## 6. Adding a shared schema

```javascript
myField: {
  $ref: "http://url.com/sh.json#";
}
```

will search for a shared schema added with $id: '<http://url.com/sh.json>'

```javascript
myField: {
  $ref: "http://url.com/sh.json#/definitions/foo";
}
```

will search for a shared schema added with $id: '<http://url.com/sh.json>' and will use the field definitions.foo

## 7. Examples

```javascript
fastify.addSchema({
  $id: "http://example.com/",
  type: "object",
  properties: {
    hello: {
      type: "string",
    },
  },
});

fastify.post("/", {
  handler() {},
  schema: {
    body: {
      type: "array",
      items: {
        $ref: "http://example.com#/properties/hello",
      },
    },
  },
});
```

```javascript
fastify.addSchema({
  $id: "commonSchema",
  type: "object",
  properties: {
    hello: {
      type: "string",
    },
  },
});

fastify.post("/", {
  handler() {},
  schema: {
    body: {
      $ref: "commonSchema#",
    },
    headers: {
      $ref: "commonSchema#",
    },
  },
});
```

## 8. Retrieving the shared schemas

To access the schemas added to the Fastify instance, you can simply use.getSchemas()

```javascript
fastify.addSchema({
  $id: "schemaId",
  type: "object",
  properties: {
    hello: {
      type: "string",
    },
  },
});

const mySchemas = fastify.getSchemas();
const mySchema = fastify.getSchema("schemaId");
```

getSchemas is encapsulated and returns the shared schemas available in the selected scope.

## 9. Validator Compiler

The validatorCompiler is a func that returns a func that validates the body, URL parameters, headers, and query string.
The default validatorCompiler of fastify returns a func that implements the ajv validation interface with default ajv configuration.
If you want to change or set additional config options, you will need to create your own instance and override the existing instance.

```javascript
const fastify = require("fastify")();
const Ajv = require("ajv");
const ajv = new Ajv({
  removeAdditional: "all",
  useDefaults: true,
  coerceTypes: "array",
  // any other options
  // ...
});
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema);
});
```

The Default configuration in Fastify supports coercing array parameters in querystring.

```javascript
const opts = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        ids: {
          type: "array",
          default: [],
        },
      },
    },
  },
};

fastify.get("/", opts, (request, reply) => {
  reply.send({
    params: request.query,
  }); // echo the querystring in form of array
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
});
```

## 10. Using Other validation libraries

The setValidatorCompiler function makes it easy to substitute ajv with almost any JavaScript validation library(joi....) or a custom one.

```javascript
const Joi = require("joi");
fastify.post(
  "/the/url",
  {
    schema: {
      body: Joi.object()
        .keys({
          hello: Joi.string().required(),
        })
        .required(),
    },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return (data) => schema.validate(data);
    },
  },
  handler
);
```

## 11. Error Handling

Note all validation errors will be added a statusCode property set to 400.
When schema validation fails for a request, Fastify will automatically return a status 400 response including the result from the validator in the payload.
For example:

````javascript
const schema = {
    body: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            }
        },
        required: ['name']
    }
}```

For above schema if route  fail to satisfy, it immediately return a response with the following payload.

``` javascript
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "body should have required property name"
}```

If you want to handle errors inside the route, you can specify the attachValidation option for your route.
If there is a validation error, the validationError property of the request will contain the Error object.

```javascript
const fastify = Fastify()

fastify.post('/', {
    schema,
    attachValidation: true
}, function(req, reply) {
    if (req.validationError) {
        reply.code(400).send(req.validationError)
    }
})
````

You can also use setErrorHandler to define a custom response for validation errors such as

```javascript
fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    reply.status(422).send(new Error("validation failed"));
  }
});
```

## 12. Custom errorHandler

For writing a custom error handler, Fastify adds 2 properties to all validation errors:

- validation, This holds details about the validation problem, like which part of the data is invalid and why.
  For example, if a required field is missing or the wrong type is used, this will explain exactly what went wrong.

- validationContext, This tells you which part of the request failed validation.
  It could be the body, params, or query, depending on what part of the request was being validated.

## 13. Example of custom errorHandler handling validation errors

```javascript
const errorHandler = (error, request, reply) => {
  const statusCode = error.statusCode;
  let response;

  const { validation, validationContext } = error;

  // check if we have a validation error
  if (validation) {
    response = {
      // validationContext will be 'body' or 'params' or 'headers' or 'query'
      message: `A validation error occurred when validating the ${validationContext}...`,
      // this is the result of your validation library...
      errors: validation,
    };
  } else {
    response = {
      message: "An error occurred...",
    };
  }

  // any additional work here, eg. log error
  // ...

  reply.status(statusCode).send(response);
};
```

## 14. Example showing how to add custom error messages for each property of a schema by supplying custom AJV options

```javascript
const fastify = Fastify({
  ajv: {
    customOptions: {
      jsonPointers: true,
      // Warning: Enabling this option may lead to this security issue https://www.cvedetails.com/cve/CVE-2020-8192/
      allErrors: true,
    },
    plugins: [require("ajv-errors")],
  },
});

const schema = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
        errorMessage: {
          type: "Bad name",
        },
      },
      age: {
        type: "number",
        errorMessage: {
          type: "Bad age", // specify custom message for
          min: "Too young", // all constraints except required
        },
      },
    },
    required: ["name", "age"],
    errorMessage: {
      required: {
        name: "Why no name!", // specify error message for when the
        age: "Why no age!", // property is missing from input
      },
    },
  },
};

fastify.post(
  "/",
  {
    schema,
  },
  (request, reply) => {
    reply.send({
      hello: "world",
    });
  }
);
```

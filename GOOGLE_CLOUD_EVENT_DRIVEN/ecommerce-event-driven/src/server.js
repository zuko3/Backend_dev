require("dotenv").config();

const buildApp = require("./app");
const orderRoutes = require("./routes/order.routes");

async function start() {
  const app = buildApp();
  app.register(orderRoutes, { prefix: "/orders" });
  await app.listen({ port: 3000, host: "0.0.0.0" });
  console.log("Server running on port 3000");
}

start();

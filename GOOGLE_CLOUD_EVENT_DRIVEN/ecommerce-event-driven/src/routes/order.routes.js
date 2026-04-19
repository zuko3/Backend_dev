const { createOrderHandler } = require("../controllers/order.controller");

async function orderRoutes(app) {
  app.post("/", createOrderHandler);
}

module.exports = orderRoutes;

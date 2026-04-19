const { createOrderService } = require("../services/order.service");

async function createOrderHandler(request, reply) {
  const body = request.body;

  const order = await createOrderService(body);

  return reply.send({
    orderId: order.id,
    status: order.status,
  });
}

module.exports = {
  createOrderHandler,
};

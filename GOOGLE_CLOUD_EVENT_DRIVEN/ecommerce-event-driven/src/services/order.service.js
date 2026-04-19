const { v4: uuidv4 } = require("uuid");
const { createOrder } = require("../repositories/order.repository");
const { publishEvent } = require("../events/publisher");

async function createOrderService(payload) {
  const orderId = uuidv4();

  const order = {
    id: orderId,
    userId: payload.userId,
    totalAmount: payload.totalAmount,
    status: "CREATED",
  };

  // 1. Save to DB
  await createOrder(order);

  // 2. Create Event
  const event = {
    eventId: uuidv4(),
    eventType: "OrderCreated",
    timestamp: new Date().toISOString(),
    data: {
      orderId,
      userId: payload.userId,
      items: payload.items,
      totalAmount: payload.totalAmount,
    },
  };

  // 3. Publish Event
  await publishEvent(event);

  return order;
}

module.exports = {
  createOrderService,
};

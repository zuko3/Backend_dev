const pubsub = require("../infra/pubsub");

const TOPIC_NAME = "order-events";

async function publishEvent(event) {
  const dataBuffer = Buffer.from(JSON.stringify(event));

  await pubsub.topic(TOPIC_NAME).publishMessage({
    data: dataBuffer,
  });

  console.log("Event published:", event.eventType);
}

module.exports = {
  publishEvent,
};

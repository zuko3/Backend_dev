const Fastify = require("fastify");
const { PubSub } = require("@google-cloud/pubsub");

require("dotenv").config();
const app = Fastify({ logger: true });
const pubsub = new PubSub({
  projectId: process.env.GCP_PROJECT_ID,
});

const subscription = pubsub.subscription("order-events-sub");

function startConsumer() {
  console.log("🚀 Consumer started...");
  subscription.on("message", async (message) => {
    try {
      const data = JSON.parse(message.data.toString());
      console.log("📩 Received event:", data.eventType);
      console.log("TRACE:", data.traceId);
      await processEvent(data);
      // ACK → tells Pub/Sub message is done
      message.ack();
      console.log("✅ Message ACKED:", data.eventId);
    } catch (err) {
      console.error("❌ Processing failed:", err);
      // NACK → message will be retried
      message.nack();
    }
  });
}

async function processEvent(event) {
  if (event.eventType === "OrderCreated") {
    console.log("💳 Processing payment...");
    await new Promise((r) => setTimeout(r, 1000));
    console.log("✅ Payment complete");
  }
}

app.get("/start-consumer", async (req, reply) => {
  startConsumer();
  return { status: "consumer started" };
});

app.listen({ port: 4000, host: "0.0.0.0" }, () => {
  console.log("Consumer API running on port 4000");
});

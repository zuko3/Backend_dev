require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.post("/pubsub", async (req, res) => {
  try {
    const message = req.body.message;

    const data = JSON.parse(Buffer.from(message.data, "base64").toString());

    console.log("📩 Received Event:", data.eventType);

    await handlePayment(data);

    res.status(200).send("OK");
  } catch (err) {
    console.error("Error processing message:", err);
    res.status(500).send("Error");
  }
});

async function handlePayment(event) {
  if (event.eventType !== "OrderCreated") return;

  const order = event.data;

  console.log("💳 Processing payment for order:", order.orderId);

  // simulate processing delay
  await new Promise((r) => setTimeout(r, 1000));

  console.log("✅ Payment SUCCESS for:", order.orderId);
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Payment service running on", port);
});

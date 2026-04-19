require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.post("/pubsub", async (req, res) => {
  try {
    const message = req.body.message;

    const data = JSON.parse(Buffer.from(message.data, "base64").toString());

    console.log("📦 Inventory received event:", data.eventType);

    await handleInventory(data);

    res.status(200).send("OK");
  } catch (err) {
    console.error("Inventory error:", err);
    res.status(500).send("Error");
  }
});

async function handleInventory(event) {
  if (event.eventType !== "OrderCreated") return;

  const order = event.data;

  console.log("🔄 Reserving stock for order:", order.orderId);

  await new Promise((r) => setTimeout(r, 800));

  console.log("✅ Inventory RESERVED for:", order.orderId);
}

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log("Inventory service running on", port);
});

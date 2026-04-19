require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.post("/pubsub", async (req, res) => {
  try {
    const message = req.body.message;

    const data = JSON.parse(Buffer.from(message.data, "base64").toString());

    console.log("📨 Notification received:", data.eventType);

    await handleNotification(data);

    res.status(200).send("OK");
  } catch (err) {
    console.error("Notification error:", err);
    res.status(500).send("Error");
  }
});

async function handleNotification(event) {
  const order = event.data;

  console.log("📧 Sending email for order:", order.orderId);

  await new Promise((r) => setTimeout(r, 500));

  console.log("✅ Notification SENT for:", order.orderId);
}

const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log("Notification service running on", port);
});

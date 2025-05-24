import { createClient } from "redis";

const publisher = createClient({
  url: process.env.REDIS_URL,
});

export async function publish(event) {
  if (!publisher.isOpen) {
    await publisher.connect();
  }
  const message = JSON.stringify(event);
  publisher.publish(process.env.LOG_CHANNEL_NAME, message);
}

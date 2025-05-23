import { createClient } from "redis";

const publisher = createClient(6379, "127.0.0.1");

export async function publish(event) {
  if (!publisher.isOpen) {
    await publisher.connect();
  }
  const message = JSON.stringify(event);
  publisher.publish(process.env.LOG_CHANNEL_NAME, message);
}

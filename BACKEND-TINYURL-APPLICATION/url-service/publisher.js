import { createClient } from "redis";

export async function publish(event) {
  const publisher = createClient(6379, "127.0.0.1");
  await publisher.connect();
  const message = JSON.stringify(event);
  publisher.publish(process.env.LOG_CHANNEL_NAME, message);
}

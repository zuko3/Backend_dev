import { createClient } from "redis";
import { CHANNEL_NAME } from "./constant.js";

export async function publisher(event) {
  const publisher = createClient();
  await publisher.connect();
  const message = JSON.stringify(event);
  publisher.publish(CHANNEL_NAME, message);
  console.log(`> Message Published ${message} to ${CHANNEL_NAME}`);
}

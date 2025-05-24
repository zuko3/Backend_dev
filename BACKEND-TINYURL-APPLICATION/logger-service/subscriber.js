import logger from "./logger.js";
import { createClient } from "redis";

const subscribe = createClient({
  url: process.env.REDIS_URL,
});

function messageListener(message) {
  try {
    const parsedPayload = JSON.parse(message);
    const { type, tag, metadata, sendLog } = parsedPayload;
    const payloadToSend = {
      metadata: metadata,
      sendLog: sendLog,
    };
    if (type === "INFO") {
      logger.info(tag, payloadToSend);
    } else if (type === "WARN") {
      logger.warn(tag, payloadToSend);
    } else if (type === "ERROR") {
      logger.error(tag, payloadToSend);
    } else {
      //can handle more type
    }
  } catch (err) {
    console.log("Invalid message received .....", message);
  }
}

function errorHandler(error) {
  console.log("Subscriber connection error ...", error);
}

function connectHandler() {
  console.log("Subscriber connected ...");
}

export default async function subscriber() {
  subscribe.on("error", errorHandler);
  subscribe.on("connect", connectHandler);
  if (!subscribe.isOpen) {
    await subscribe.connect();
  }
  subscribe.subscribe(process.env.LOG_CHANNEL_NAME, messageListener);
}

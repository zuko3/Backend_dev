import axios from "axios";
import { createLogger, format, transports } from "winston";
import Transport from "winston-transport";
import {
  getApplicationName,
  getLogsEnabled,
  getLoggerConfig,
} from "./utils/log_util.js";

const { combine, timestamp, json, errors } = format;
const errorsFormat = errors({ stack: true });
const httpTransportOptions = {
  ...getLoggerConfig(),
};

async function dataDogTransporter(payload) {
  if (!getLogsEnabled()) {
    return;
  }

  const { level, message, timestamp, metadata, sendLog } = payload;
  const messageDate = `[${getApplicationName()}]${message}[${new Date().toISOString()}]`;

  if (sendLog || level === "error" || level === "warn") {
    const data = [
      {
        level: level,
        message: messageDate,
        service: httpTransportOptions.service,
        metadata: metadata,
        ddsource: httpTransportOptions.ddsource,
        ddtags: httpTransportOptions.ddtags,
        timestamp: timestamp,
      },
    ];
    return axios
      .post(`${httpTransportOptions.host}${httpTransportOptions.path}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response on transport success:", response?.status);
      })
      .catch((error) => {
        console.log("Error on transport:", error?.response?.status);
      });
  }
}

class CustomTransport extends Transport {
  log(payload, cb) {
    dataDogTransporter(payload);
    cb(null);
  }
}

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: json(),
  transports: [
    new transports.Console({
      format: combine(timestamp(), json(), errorsFormat),
    }),
    new CustomTransport({
      format: combine(timestamp(), json(), errorsFormat),
    }),
  ],
});

export default logger;

function getEnv() {
  return process.env.ENV;
}

function getApplicationName() {
  return `${process.env.APPLICATION_NAME}_${getEnv()}`;
}

function getLogHostName() {
  if (["PROD", "QA", "UAT"].includes(getEnv())) {
    return `cloud_${getEnv()}`;
  }
  return `localhost_${getEnv()}`;
}

function getLogsEnabled() {
  if (process.env.DATADOG_ENABLED_LOGS === "true") {
    return true;
  }
  return false;
}

function getLoggerConfig() {
  return {
    host: process.env.LOGGING_HOST,
    path: `/api/v2/logs?dd-api-key=${
      process.env.DATADOG_API_KEY
    }&ddsource=nodejs&service=${getApplicationName()}`,
    ssl: true,
    hostname: getLogHostName(),
    service: getApplicationName(),
    ddsource: "nodejs",
    ddtags: `env:${getEnv()}`,
  };
}
export { getApplicationName, getLogsEnabled, getLoggerConfig };

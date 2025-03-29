import { deleteExpiredEntries } from "../jobs/deleteExpiredEntries.js";

function runCronjobs() {
  deleteExpiredEntries();
}

runCronjobs();

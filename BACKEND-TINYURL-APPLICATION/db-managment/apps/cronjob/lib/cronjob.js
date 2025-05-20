import { deleteExpiredEntries } from "../jobs/deleteExpiredEntries.js";

export function runCronjobs() {
  deleteExpiredEntries();
}

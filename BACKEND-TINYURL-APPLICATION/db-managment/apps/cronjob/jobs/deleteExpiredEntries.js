import cron from "node-cron";
import { dbConfig } from "@tinyurl/urls-lib";
import pg from "pg";

const { Pool } = pg;

function deleteExpiredEntries() {
  cron.schedule("* * * * *", async function () {
    try {
      const pool = new Pool({
        connectionString: dbConfig.connectionString,
      });
      const startTime = Date.now();
      await pool.query(
        "DELETE FROM tableurls WHERE expiry_date < CURRENT_DATE;"
      );
      console.log(
        `CRON_JOB DELETE_EXPIRED_ENTRIES Completed in ${
          Date.now() - startTime
        }ms`
      );
    } catch (err) {
      console.log("CRON_JOB_ERR:", err);
    }
  });
}

export { deleteExpiredEntries };

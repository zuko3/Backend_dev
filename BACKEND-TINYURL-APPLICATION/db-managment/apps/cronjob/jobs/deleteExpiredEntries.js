import cron from "node-cron";
import pg from "pg";

const { Pool } = pg;

//TODO: Will move to some config file
const dbConfig = {
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionString: process.env.connectionString,
};

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

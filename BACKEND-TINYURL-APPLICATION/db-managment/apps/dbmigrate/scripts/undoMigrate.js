import Postgrator from "postgrator";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { dbConfig } from "@tinyurl/urls-lib";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function undoMigrate() {
  const client = new pg.Client(dbConfig);
  try {
    await client.connect();

    const postgrator = new Postgrator({
      migrationPattern: __dirname + "/../migrations/*",
      driver: "pg",
      execQuery: (query) => client.query(query),
    });

    postgrator.on("validation-started", (migration) =>
      console.log(`Validation-started => ${migration.filename}`)
    );
    postgrator.on("validation-finished", (migration) =>
      console.log(`Validation-finished => ${migration.filename}`)
    );
    postgrator.on("migration-started", (migration) =>
      console.log(`Migration-started => ${migration.filename}`)
    );
    postgrator.on("migration-finished", (migration) =>
      console.log(`Migration-finished => ${migration.filename}`)
    );

    await postgrator.migrate("000");
  } catch (error) {
    console.error(error?.appliedMigrations);
  }
  await client.end();
}

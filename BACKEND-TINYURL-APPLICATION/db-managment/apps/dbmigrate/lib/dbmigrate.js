import { doMigrate } from "../scripts/migrate.js";
import { undoMigrate } from "../scripts/undoMigrate.js";

function migrate(type) {
  if (type === "do") {
    doMigrate();
  } else if (type === "undo") {
    undoMigrate();
  } else {
    console.error("db action type (do|undo)");
  }
}

migrate(process.argv[2]);

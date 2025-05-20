import runCronjobs from "@db-managment/cronjob";
import migrate from "@db-managment/dbmigrate";

function dbMgmt(action, type) {
  if (action === "migrate") {
    migrate(type);
  } else if (type == "runcronjob") {
    runCronjobs();
  }
}

dbMgmt(process.argv[2], process.argv[3]);

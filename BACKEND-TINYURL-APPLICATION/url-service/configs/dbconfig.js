//to be moved in docker file
const dbConfig = {
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionString: process.env.connectionString,
};

export { dbConfig };

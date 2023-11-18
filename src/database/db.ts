const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "learn_express_postgres",
  password: "root",
  port: "5432",
});

export default pool;
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "college",
  connectionLimit: 5
});

module.exports = pool;
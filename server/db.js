const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
})

module.exports = pool

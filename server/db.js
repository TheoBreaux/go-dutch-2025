const Pool = require('pg').Pool
require('dotenv').config()

console.log("PROCESS:", process.env) // remove this after you've confirmed it is working


const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
})

console.log("Database password:", process.env.PASSWORD);


module.exports = pool

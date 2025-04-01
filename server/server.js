const PORT = process.env.PORT ?? 8000 //accesses secret variable
const express = require('express')
const app = express()
const pool = require('./db')

//get all
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users')
    res.json(users.rows)
  } catch (error) {
    console.error(error)
  }
})

pool
  .connect()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Connection error', err))

console.log('Database password:', process.env.PASSWORD)

app.listen(PORT, () => console.log(`SERVER running on PORT ${PORT}`))

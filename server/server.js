const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Pool = require('pg').Pool
require('dotenv').config()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const { uploadFileToS3 } = require('./s3')

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
})

//just so i know the server is up and running
pool
  .connect()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Connection error', err))

app.listen(PORT, () => console.log(`SERVER running on PORT ${PORT}`))

//REGISTER USER IN DATABASE
app.post('/signUp', upload.single('profileImage'), async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body
  const file = req.file

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    // 🔍 Check if email or username is already taken
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username])

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0]
      let message = 'Email or username is already taken'
      if (user.email === email) message = 'Email already taken.'
      else if (user.username === username) message = 'Username already taken.'
      return res.status(409).json({ success: false, message })
    }

    let imgUrl = null

    if (file) {
      imgUrl = await uploadFileToS3(file, 'profileImages')
    }

    // ✅ Proceed with inserting the new user
    const newUser = await pool.query(
      `INSERT INTO users(first_name, last_name, email, username, hashed_password, img_url)
       VALUES($1, $2, $3, $4, $5, $6)
       RETURNING user_id`,
      [firstName, lastName, email, username, hashedPassword, imgUrl]
    )

    const userId = newUser.rows[0].user_id

    const token = jwt.sign({ email, username, firstName, lastName, userId }, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      userId,
      email,
      username,
      firstName,
      lastName,
      token,
      imgUrl,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error', detail: error.detail })
  }
})

//LOG IN USER
app.post('/logIn', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (!user.rows.length) {
      return res.status(401).json({
        success: false,
        message: 'User email does not exist.',
      })
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].hashed_password)

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password.',
      })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    })

    res.status(200).json({
      success: true,
      message: `Welcome ${user.rows[0].first_name}!`,
      email: user.rows[0].email,
      username: user.rows[0].username,
      firstName: user.rows[0].first_name,
      lastName: user.rows[0].last_name,
      bio: user.rows[0].bio,
      favoriteCuisine: user.rows[0].favorite_cuisine,
      birthday: user.rows[0].birthday,
      location: user.rows[0].location,
      userId: user.rows[0].user_id,
      dateJoined: user.rows[0].date_joined,
      imgUrl: user.rows[0].img_url,
      token,
    })
  } catch (error) {
    console.error('Login error:', error.stack || error.message)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

//GET FEATURED SPONSORED RESTAURANTS
app.get('/featuredRestaurants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM featured_restaurants')

    const featuredRestaurantData = result.rows.map(
      ({ restaurant_id, name, address, city, state, zip, website, rating, phone, bio, cuisine, img_url, is_favorited }) => ({
        restaurantId: restaurant_id,
        name,
        address,
        city,
        state,
        zip,
        website,
        rating,
        phone,
        bio,
        cuisine,
        imgUrl: img_url,
        isFavorited: is_favorited,
      })
    )
    res.json(featuredRestaurantData)
  } catch (error) {
    console.error('Error fetching featured restaurants:', error.stack)
    res.status(500).send('Internal Server Error')
  }
})

// AUTOCOMPLETE TO SEE IF DINER IS ALREADY IN DATABASE
app.get('/diners/suggestions', async (req, res) => {
  const userInput = req.query.input

  try {
    const autoCompleteDiner = await pool.query(`SELECT * FROM users WHERE username ILIKE $1 OR first_name ILIKE $1 LIMIT 10;`, [`%${userInput}%`])
    const suggestions = autoCompleteDiner.rows.map((row) => ({
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      birthday: row.birthday,
      imgUrl: row.img_url,
    }))
    res.json(suggestions)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// CONFIRM THAT USER EXISTS IN DB SO CAN BE ADDED AS DINER
app.get('/users/:username', async (req, res) => {
  const { username } = req.params

  try {
    const userExists = await pool.query(`SELECT EXISTS (SELECT 1 FROM users WHERE username = $1)`, [username])
    res.json(userExists.rows[0].exists)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

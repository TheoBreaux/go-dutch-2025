const PORT = process.env.PORT ?? 8000 //accesses secret variable
const express = require('express')
const app = express()
app.use(express.json())
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const cors = require('cors')
// app.use(cors())

//just so i know the server is iup and running
pool
  .connect()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Connection error', err))

app.listen(PORT, () => console.log(`SERVER running on PORT ${PORT}`))

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

//CREATE USER IN DATABASE
app.post('/signUp', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  console.log('SERVER')

  try {
    // 🔍 Check if email or username is already taken
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username])

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0]
      let message = 'Email or username is already taken'
      if (user.email === email) message = 'Email is already taken'
      else if (user.username === username) message = 'Username is already taken'
      return res.status(409).json({ success: false, message })
    }

    // ✅ Proceed with inserting the new user
    const newUser = await pool.query(
      `INSERT INTO users(first_name, last_name, email, username, hashed_password)
       VALUES($1, $2, $3, $4, $5)
       RETURNING user_id`,
      [firstName, lastName, email, username, hashedPassword]
    )

    const userId = newUser.rows[0].user_id

    const token = jwt.sign({ email, username, firstName, lastName, userId }, 'secret', {
      expiresIn: '1hr',
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: {
        userId,
        email,
        username,
        firstName,
        lastName,
        token,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error', detail: error.detail })
  }
})

//LOG IN USER
app.post('/logIn', async (req, res) => {
  const { email, password } = req.body

  console.log('REQUEST:', req.body)

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (!user.rows.length)
      return res.status.json({
        success: false,
        message: 'User does not exist!',
      })

    const success = await bcrypt.compare(password, user.rows[0].hashed_password)
    const token = jwt.sign({ email }, 'secret', {
      expiresIn: '1hr',
    })
    if (success) {
      res.json({
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
        token,
      })
    } else {
      res.json({ detail: 'Login failed' })
    }
  } catch (error) {
    console.error(error)
  }
})

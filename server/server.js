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

// Add this route to handle the root path
app.get('/', (req, res) => {
  res.send('Go Dutch Server is running! 🚀')
})

//SIGN UP USER IN DATABASE
app.post('/signup', upload.single('profileImage'), async (req, res) => {
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
app.post('/login', async (req, res) => {
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
      availableSplits: user.rows[0].available_splits,
      success: true,
      message: `Welcome, ${user.rows[0].first_name}!`,
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
    const result = await pool.query('SELECT * FROM restaurants')

    const featuredRestaurantData = result.rows.map(
      ({ restaurant_id, name, address, city, state, zip, website, rating, phone, bio, cuisine, img_url, is_featured, is_restaurant }) => ({
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
        isFeatured: is_featured,
        isRestaurant: is_restaurant,
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
      userId: row.user_id,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      birthday: row.birthday,
      imgUrl: row.img_url,
      isPrimaryDiner: false,
      bio: row.bio,
      location: row.location,
      favoriteCuisine: row.favorite_cuisine,
      dateJoined: row.date_joined,
    }))
    res.json(suggestions)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// SEND NEW DINING EVENTS TO DATABASE
app.post('/diningevents', upload.single('receiptImage'), async (req, res) => {
  const { eventId, date, restaurantName, eventTitle, primaryDinerId, subtotal, tax, tip, totalMealCost, allDiners } = req.body
  const file = req.file

  let imgUrl = null

  if (file) {
    imgUrl = await uploadFileToS3(file, 'receiptImages')
  }

  try {
    await pool.query(
      `INSERT INTO dining_events(event_id, dining_date, restaurant_bar, title, primary_diner_id, subtotal, tax, tip, total_meal_cost, img_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [eventId, date, restaurantName, eventTitle, primaryDinerId, subtotal, tax, tip, totalMealCost, imgUrl]
    )

    const diners = JSON.parse(allDiners) // ✅ turns string into array of objects

    for (const diner of diners) {
      await pool.query('INSERT INTO event_diners(event_id, user_id, is_celebrating, diner_meal_cost) VALUES($1, $2, $3, $4)', [
        eventId,
        diner.id,
        diner.isCelebrating,
        diner.total,
      ])
    }

    res.status(200).json(req.body)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create dining event' })
  }
})

// FECTH DINING HISTORY
app.get('/diningevents/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const diningEvents = await pool.query(
      `
        SELECT 
          dining_events.*, 
          users.username AS primary_diner_username,
          json_agg(
            json_build_object(
              'user_id', event_diners.user_id,
              'username', diner_user.username,
              'first_name', diner_user.first_name,
              'last_name', diner_user.last_name,
              'bio', diner_user.bio,
              'location', diner_user.location,
              'birthday', diner_user.birthday,
              'date_joined', diner_user.date_joined,
              'img_url', diner_user.img_url,
              'favorite_cuisine', diner_user.favorite_cuisine,
              'dinerMealCost', event_diners.diner_meal_cost,
              'isCelebrating', event_diners.is_celebrating,
              'isPrimaryDiner', (event_diners.user_id = dining_events.primary_diner_id)
            )
          ) AS diners
        FROM dining_events
        JOIN users 
          ON dining_events.primary_diner_id = users.user_id
        JOIN event_diners 
          ON dining_events.event_id = event_diners.event_id
        JOIN users AS diner_user 
          ON event_diners.user_id = diner_user.user_id
        WHERE dining_events.event_id IN (
          SELECT dining_events.event_id
          FROM dining_events
          LEFT JOIN event_diners 
            ON dining_events.event_id = event_diners.event_id
          WHERE dining_events.primary_diner_id = $1 
             OR event_diners.user_id = $1
        )
        GROUP BY 
          dining_events.event_id, 
          users.username;
      `,
      [userId]
    )

    const eventData = diningEvents.rows.map((event) => ({
      diningDate: event.dining_date,
      eventId: event.event_id,
      // primaryDinerId: event.primary_diner_id,
      eventLocation: event.restaurant_bar,
      eventTitle: event.title,
      primaryDinerUsername: event.primary_diner_username,
      diners: event.diners,
      imgUrl: event.img_url,
    }))
    res.json(eventData)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

//UPDATE USER PROFILE
app.post('/updateprofile', upload.single('profileImage'), async (req, res) => {
  try {
    const { firstName, lastName, email, username, bio, favoriteCuisine, birthday, location, userId, password } = req.body

    const file = req.file // Uploaded image

    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId])

    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const existingUser = await pool.query('SELECT * FROM users WHERE (email = $1 OR username = $2) AND user_id != $3', [email, username, userId])

    if (existingUser.rows.length > 0) {
      const conflict = existingUser.rows[0]
      let message = 'Update failed'
      if (conflict.email === email) message = 'Email already in use'
      if (conflict.username === username) message = 'Username already taken'

      return res.status(409).json({ success: false, message })
    }

    // Handle password update if provided
    let hashedPassword

    if (password) {
      const salt = bcrypt.genSaltSync(10)
      hashedPassword = bcrypt.hashSync(password, salt)
    }

    // Handle image upload if provided
    let imgUrl = userCheck.rows[0].img_url
    if (file) {
      imgUrl = await uploadFileToS3(file, 'profileImages')
    }

    // Update user in database
    const updateQuery = `
      UPDATE users 
      SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        username = $4,
        bio = $5,
        favorite_cuisine = $6,
        birthday = $7,
        location = $8,
        ${hashedPassword ? 'hashed_password = $10,' : ''}
        img_url = $9
      WHERE user_id = ${hashedPassword ? '$11' : '$10'}
      RETURNING *
    `

    const queryParams = [firstName, lastName, email, username, bio, favoriteCuisine, birthday, location, imgUrl]

    if (hashedPassword) {
      queryParams.push(hashedPassword)
    }
    queryParams.push(userId)

    const updatedUser = await pool.query(updateQuery, queryParams)

    // Generate new token
    const token = jwt.sign(
      {
        email: updatedUser.rows[0].email,
        username: updatedUser.rows[0].username,
        firstName: updatedUser.rows[0].first_name,
        lastName: updatedUser.rows[0].last_name,
        userId: updatedUser.rows[0].user_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1hr' }
    )

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        firstName: updatedUser.rows[0].first_name,
        lastName: updatedUser.rows[0].last_name,
        email: updatedUser.rows[0].email,
        username: updatedUser.rows[0].username,
        bio: updatedUser.rows[0].bio,
        favoriteCuisine: updatedUser.rows[0].favorite_cuisine,
        birthday: updatedUser.rows[0].birthday,
        location: updatedUser.rows[0].location,
        imgUrl: updatedUser.rows[0].img_url,
        userId: updatedUser.rows[0].user_id,
      },
      token,
    })
  } catch (error) {
    console.error('Profile update error:', error)

    // Handle unique constraint violations
    if (error.code === '23505') {
      const detail = error.detail
      let message = 'Update failed'

      if (detail.includes('email')) {
        message = 'Email already in use'
      } else if (detail.includes('username')) {
        message = 'Username already taken'
      }

      return res.status(409).json({
        success: false,
        message,
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error during profile update',
    })
  }
})

//TOGGLE FAVORITES
app.post('/updatefavorites', async (req, res) => {
  const { favoritedId, userId, type } = req.body

  try {
    const existingFavorite = await pool.query(
      `SELECT * FROM favorites
       WHERE user_id = $1 AND favorited_id = $2 AND favorited_type = $3`,
      [userId, favoritedId, type]
    )

    let updatedFavorite = null

    if (existingFavorite.rows.length > 0) {
      // Remove favorite
      await pool.query(
        `DELETE FROM favorites
         WHERE user_id = $1 AND favorited_id = $2 AND favorited_type = $3`,
        [userId, favoritedId, type]
      )
    } else {
      // Add favorite
      await pool.query(
        `INSERT INTO favorites (user_id, favorited_id, favorited_type)
         VALUES ($1, $2, $3)`,
        [userId, favoritedId, type]
      )
    }
    if (type === 'restaurant') {
      const restaurant = await pool.query(`SELECT * FROM restaurants WHERE restaurant_id = $1`, [favoritedId])

      updatedFavorite = {
        favorited_type: 'restaurant',
        favorited_id: favoritedId,
        restaurant: restaurant.rows[0],
        diner: null,
      }
    } else if (type === 'diner') {
      const dinerResult = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [favoritedId])
      const diner = dinerResult.rows[0]

      // Remove sensitive/unneeded fields
      delete diner.email
      delete diner.hashed_password
      delete diner.available_splits

      updatedFavorite = {
        favorited_type: 'diner',
        favorited_id: favoritedId,
        restaurant: null,
        diner,
      }
    }
    return res.status(200).json({
      updatedFavorite,
    })
  } catch (error) {
    console.error('Error updating favorites:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

//FETCH FAVORITES
app.get('/favorites/:userId', async (req, res) => {
  try {
    const favorites = await pool.query(
      `SELECT 
  favorites.favorited_type,
  favorites.favorited_id,
  favorites.notes,

  CASE 
    WHEN favorites.favorited_type = 'restaurant' THEN row_to_json(restaurants)
    ELSE NULL
  END AS restaurant,

  CASE 
    WHEN favorites.favorited_type = 'diner' THEN row_to_json(
      (SELECT u2_filtered FROM (
        SELECT 
          u2.user_id,
          u2.first_name,
          u2.last_name,
          u2.username,
          u2.location,
          u2.birthday,
          u2.bio,
          u2.favorite_cuisine,
          u2.date_joined,
          u2.img_url,
          u2.is_diner
      ) AS u2_filtered)
    )
    ELSE NULL
  END AS diner

FROM favorites
JOIN users AS u1 ON favorites.user_id = u1.user_id
LEFT JOIN restaurants ON favorites.favorited_type = 'restaurant' AND favorites.favorited_id = restaurants.restaurant_id
LEFT JOIN users AS u2 ON favorites.favorited_type = 'diner' AND favorites.favorited_id = u2.user_id
WHERE favorites.user_id = $1
`,
      [req.params.userId]
    )
    res.status(200).json(favorites.rows)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

//UPDATE NOTES
app.post('/updatenotes', async (req, res) => {
  const { favoritedType, favoritedId, notes, userId } = req.body
  console.log('REQUEST ', req.body)

  try {
    await pool.query(
      `INSERT INTO favorites (user_id, favorited_id, favorited_type, notes)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, favorited_id, favorited_type)
       DO UPDATE SET notes = EXCLUDED.notes`,
      [userId, favoritedId, favoritedType, notes]
    )

    res.json({ message: 'Notes updated successfully.' })
  } catch (error) {
    console.error('Error updating notes:', error)
    res.status(500).json({ message: 'Failed to update notes.' })
  }
})

//FETCH NOTES
app.get('/fetchnotes/:userId/:favoritedType/:favoritedId', async (req, res) => {
  const { userId, favoritedType, favoritedId } = req.params

  try {
    const result = await pool.query(
      `SELECT notes
       FROM favorites
       WHERE user_id = $1 AND favorited_id = $2 AND favorited_type = $3`,
      [userId, favoritedId, favoritedType]
    )

    if (result.rows.length > 0) {
      const { notes } = result.rows[0]
      res.json({ notes })
    } else {
      res.json({ notes: null })
    }
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ message: 'Failed to fetch notes.' })
  }
})

const PORT = process.env.PORT ?? 8000 //accesses secret variable
const express = require('express')
const app = express()
const pool = require('./db')

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

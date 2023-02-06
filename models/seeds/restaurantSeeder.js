const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantsList = require("../../restaurant.json").results

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    ownedRestaurants: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurants: [3, 4, 5]
  }
]

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', async () => {
  try {
    await Promise.all(
      SEED_USER.map(async (user) => {
        const { name, email, password, ownedRestaurants } = user
        const createdUser = await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, 10) // (加密值,加鹽次數)
        })
        const restaurants = ownedRestaurants.map(Index => {
          const restaurant = restaurantsList[Index]
          restaurant.userId = createdUser._id
          return restaurant
        })
        await Restaurant.create(restaurants)
      })
    )
    console.log('done.')
    process.exit()
  }
  catch (err) {
    console.log(err)
  }
})
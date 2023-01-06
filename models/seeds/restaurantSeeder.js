const bcrypt = require('bcryptjs')
const { response } = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantsList = require("../../restaurant.json").results


const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
    ownedRestaurants: [0, 1, 2]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurants: [3, 4, 5]
  }
]

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  Promise.all(
    SEED_USER.map(user => {
      const { email, password, ownedRestaurants } = user
      return User.create({
        email,
        password: bcrypt.hashSync(password, 10) // (加密值,加鹽次數)
      })
        .then(user => {
          const restaurants = ownedRestaurants.map(Index => {
            const restaurant = restaurantsList[Index]
            restaurant.userId = user._id
            return restaurant

          })
          return Restaurant.create(restaurants)
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
    .finally(() => db.close)
})
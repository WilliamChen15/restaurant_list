const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurants = require("../../restaurant.json").results

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  Restaurant.create(restaurants)
    .then(() => {
      console.log("done.")
      db.close()
    })
    .catch(err => console.log(err))
})
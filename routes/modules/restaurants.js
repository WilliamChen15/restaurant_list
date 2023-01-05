// 引用 Express 與 Express 路由器
const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//修改
//頁面
router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  return Restaurant.find()
    .lean()
    .then(function (restaurants) {
      const restaurant = restaurants.find(item => String(item._id) === String(_id))
      const categories = restaurants.map(restaurant => restaurant.category).filter(function (category, index, array) {
        return array.indexOf(category) === index
      })
      res.render('edit', { restaurant, categories })
    })
})
//行為
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const {
    name,
    rating,
    category,
    location,
    google_map,
    phone,
    description,
    image
  } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.rating = rating
      restaurant.category = category
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      restaurant.userId = userId
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//刪除
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
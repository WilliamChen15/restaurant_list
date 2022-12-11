// 引用 Express 與 Express 路由器
const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.find({ id }) // mongoose中的findById直接抓出陣列中物件、find抓出的物件則為包含物件的陣列
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant[0] }))
    .catch(error => console.log(error))
})

// //新增
// //頁面
// router.get('/create', (req, res) => {
//   const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('create', { restaurant })
// })
// //行為
// router.post('/', (req, res) => {
//   const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant })
// })

// //修改
// //頁面
// router.get('/:restaurant_id/edit', (req, res) => {
//   const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('edit', { restaurant })
// })
// //行為
// router.put('/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant })
// })

// //刪除
// router.delete('/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('index', { restaurants : restaurantList })
// })

module.exports = router
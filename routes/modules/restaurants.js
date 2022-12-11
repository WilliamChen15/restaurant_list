// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id //toString()
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// //搜尋
// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { restaurants, keyword })
// })

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
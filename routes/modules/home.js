// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

let sort = "asc"

router.get('/', (req, res) => {
  sort = req.query.sort ? req.query.sort : sort
  return Restaurant.find()
    .lean()
    .sort({ name: sort })
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.log(error))
})

//新增
//頁面
router.get('/create', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(function (restaurants) {
      const categories = restaurants.map(restaurant => restaurant.category).filter(function (category, index, array) {
        return array.indexOf(category) === index  // 找首個分類的index，重複的因index不相等，不會回傳。
      })
      res.render('create', { categories })
    }
    )
    .catch(error => console.log(error))
})
//行為
router.post('/', (req, res) => {
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => {
      console.log("done.")
      res.redirect('/')
    })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const regex = new RegExp(keyword, 'i')// i => 不分大小寫
  sort = req.query.sort ? req.query.sort : sort
  return Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
    .lean()
    .sort({ name: sort })
    .then(restaurants => res.render('index', { restaurants, keyword, sort }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
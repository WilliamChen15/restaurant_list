// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
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
  // Restaurant.find().or([{name : keyword},{category : keyword}]) //怎麼處理大小寫?
  //   .lean()
  //   .then(restaurants => ...)
  Restaurant.find()
    .lean()
    .then(function (restaurants) {
      results = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: results, keyword })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
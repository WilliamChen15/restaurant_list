// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

let sort = "asc"
let keyword = ""

router.get('/', (req, res) => {
  const userId = req.user._id
  const currentRoute = '/'
  sort = req.query.sort ? req.query.sort : sort
  return Restaurant.find({ userId })
    .lean()
    .sort({ name: sort })
    .then(restaurants => res.render('index', { restaurants, sort, currentRoute }))
    .catch(error => console.log(error))
})

//新增
//頁面
router.get('/create', (_req, res) => {
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
router.post('/create', (req, res) => {
  const restaurant = req.body
  restaurant.userId = req.user._id
  return Restaurant.create(restaurant)
    .then(() => {
      console.log("done.")
      res.redirect('/')
    })
})

router.get('/search', (req, res) => {
  keyword = req.query.keyword
  if (!keyword.length) {
    return Restaurant.find()
      .lean()
      .then(res.redirect('/'))
      .catch(error => console.log(error))
  }
  sort = req.query.sort ? req.query.sort : sort
  const currentRoute = '/search'
  const regex = new RegExp(keyword, 'i')// i => 不分大小寫
  return Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
    .lean()
    .sort({ name: sort })
    .then(restaurants => res.render('index', { restaurants, keyword, sort, currentRoute }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const currentRoute = '/'
  sort = req.body.sort ? req.body.sort : sort
  return Restaurant.find()
    .lean()
    .sort({ name: sort })
    .then(restaurants => res.render('index', { restaurants, sort, currentRoute }))
    .catch(error => console.log(error))
})

router.post('/search', (req, res) => {
  const currentRoute = '/search'
  sort = req.body.sort ? req.body.sort : sort
  const regex = new RegExp(keyword, 'i')// i => 不分大小寫
  sort = req.query.sort ? req.query.sort : sort
  return Restaurant.find({ $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }] })
    .lean()
    .sort({ name: sort })
    .then(restaurants => res.render('index', { restaurants, keyword, sort, currentRoute }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users') 
const { authenticator } = require('../middleware/auth')
router.use('/users', users)
router.use('/restaurants', authenticator, restaurants) // 登入後才能用
router.use('/', authenticator, home) // 登入後才能用
// 匯出路由器
module.exports = router
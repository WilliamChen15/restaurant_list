// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json').results

// require express-handlebars here 
const exphbs = require('express-handlebars')

// setting template engine //樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files //靜態檔案
app.use(express.static('public'))

// routes setting //路由設定
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})


// start and listen on the Express server //啟動
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
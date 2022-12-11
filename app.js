// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const port = 3000

// setting template engine //樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// setting static files //靜態檔案
app.use(express.static('public'))
// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server //啟動
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
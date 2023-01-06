const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // 傳入函式，在調用時才執行 ; 而非建立schema時執行完的回傳值。
  }
})
module.exports = mongoose.model('User', userSchema)
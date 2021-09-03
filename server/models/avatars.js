const mongoose = require('mongoose')
const Schema = mongoose.Schema

const avatarsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Avatars', avatarsSchema)

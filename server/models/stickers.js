const mongoose = require('mongoose')
const Schema = mongoose.Schema

const avatarsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Stickers', avatarsSchema)

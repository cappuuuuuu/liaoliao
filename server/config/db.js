const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = process.env.CONNECTION_STRING
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(connectionString, options)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('server has connected!')
})

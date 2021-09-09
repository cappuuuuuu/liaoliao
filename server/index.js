const cors = require('cors')
const app = require('express')()
const bodyParser = require('body-parser')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const avatarsRoutes = require('./routes/avatars')
const stickersRoutes = require('./routes/stickers')
const socketHandler = require('./controllers/socketHandler')
const port = process.env.PORT || 5000
require('./config/db.js')

app.use(cors())
app.use(bodyParser.json())
app.use('/avatars', avatarsRoutes)
app.use('/stickers', stickersRoutes)

app.get('/', (req, res) => {
  res.send("<h1>Hello here is liaoliao's backend server</h1>")
})

io.on('connection', socket => socketHandler(io, socket))

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})

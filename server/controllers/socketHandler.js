const { saveMessage, getMessage } = require('./messagesRecords')
const { removeUser, addUser, checkUsers } = require('./usersHandler')

function socketHandler (io, socket) {
  socket.on('getRecord', async ({ page, loadCount = 10 }) => {
    const allHistory = await getMessage()
    const sliceIndex = allHistory.length - (page - 1) * loadCount
    const pageHistory = allHistory.slice(sliceIndex - loadCount < 0 ? 0 : sliceIndex - loadCount, sliceIndex)
    const data = {
      page: page,
      data: pageHistory,
      total: allHistory.length
    }
    socket.emit('chatRecord', data)
  })

  socket.on('checkUser', user => {
    socket.emit('checkResult', checkUsers(user))
  })

  socket.on('join', ({ name, avatar }) => {
    const newUsers = addUser({ name, avatar, id: socket.id })
    io.emit('join', newUsers)
  })

  socket.on('sendMessage', data => {
    saveMessage(data)
    io.emit('getMessage', data)
  })

  socket.on('typing', data => {
    io.emit('typing', data)
  })

  socket.on('disconnect', () => {
    const leftUser = removeUser(socket.id)
    if (leftUser) io.emit('userLeft', leftUser)
  })
}

module.exports = socketHandler

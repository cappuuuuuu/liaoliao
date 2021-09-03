const MessagesModel = require('../models/messages')

const saveMessage = (obj) => {
  const message = new MessagesModel(obj)
  message.save()
}

const getMessage = async () => {
  const data = await MessagesModel.find()
  console.log('data', data)
  return data
}

module.exports = { saveMessage, getMessage }

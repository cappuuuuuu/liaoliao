const MessagesModel = require('../models/messages')

const saveMessage = (obj) => {
  const message = new MessagesModel(obj)
  message.save()
}

const getMessage = () => {
  return MessagesModel.find()
}

module.exports = { saveMessage, getMessage }

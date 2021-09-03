const MessagesModel = require('../models/messages')

const saveMessage = (obj) => {
  const message = new MessagesModel(obj)
  message.save()
}

const getMessage = async () => {
  return MessagesModel.find()
}

module.exports = { saveMessage, getMessage }

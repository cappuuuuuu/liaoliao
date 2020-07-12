const mongoose = require('./db-connector');
const schema = require('./schema');
const Message = mongoose.model('Message', schema);

const pushData = (obj) => {
    const m = new Message(obj);
    m.save();
    
}

const getData = () => {
    return Message.find();
}

module.exports = { pushData , getData } 
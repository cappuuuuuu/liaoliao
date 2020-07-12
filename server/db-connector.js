const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect('mongodb+srv://Cappuu:w152489809@capuutalk-5bcpt.mongodb.net/test?retryWrites=true&w=majority', options);
 
const db = mongoose.connection;

 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('server has connected!');
});
module.exports = mongoose.connection;


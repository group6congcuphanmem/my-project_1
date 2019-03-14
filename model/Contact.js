var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Contact = new Schema({
  name: String,
  email: String,
  sdt: String,
  msg: String,
  ngay: Date
}, {
  collection: 'contact'
});

module.exports = mongoose.model('Contact', Contact);

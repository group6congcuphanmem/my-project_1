
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Slides = new Schema({
  name:   String,
  meta: String,
  img : String,
  des1 :String,
  des2:String,


},{collection : 'slides'});

module.exports = mongoose.model('Slides', Slides);

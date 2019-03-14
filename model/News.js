var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var News = new Schema({
  name: String,
  nameKhongDau: String,
  img: String,
  img1:String,
  img2:String,
  des:String,
  des1:String,
  date:Date,
  seo:String,
  author:String

}, {
  collection: 'news'
});

module.exports = mongoose.model('News', News);

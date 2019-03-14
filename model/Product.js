var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Product = new Schema({
  name 			:  String,
  nameKhongDau	: String,
  img:        String,
  img1 			: String,
  img2 			: String,
  img3 			: String,
  cateId 		: String,
  des 			: String,
  price 		: Number,
  st 			: Number,
  congnghemanhinh: String,
  dophangiai:String,
  manhinhrong:String,
  camerasau:String,
  quayphim:String,
  denflash:String,
  chupanhnangcao:String,
  cameratruoc:String,
  videocall:String,
  hedieuhanh:String,
  chipset:String,
  tocdocpu:String,
  chipdohoa:String,
  ram:String,
  bonhotrong:String,
  bonhokhadung:String,
  thenhongoai:String,
  mangdidong:String,
  sim:String,
  wifi:String,
  gps:String,
  bluetooth:String,
  congketnoi:String,
  jacktainghe:String,
  thietke:String,
  kichthuoc:String,
  trongluong:String,
  dungluongpin:String,
  loaipin:String,
  baomat:String,
  radio:String,
  xemphim:String,
  nghenhac:String,
  thoidiemramat:Date

},{collection : 'product'});

module.exports = mongoose.model('Product', Product);

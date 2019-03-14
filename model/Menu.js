var mongoose = require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = global.Promise;
var schema =new Schema({
  name:{
    type: String,
    require:true
  },
  meta:{
    type: String,
    require:true
  }
},{collection : 'menu'});
module.exports=mongoose.model('Menu',schema);

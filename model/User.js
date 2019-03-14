var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var bcrypt = require('bcryptjs');
var UserSchema = new Schema({
 email		: {type:String,require: true},
 password 		:  {type:String,require: true},
 img:{type:String}
});
UserSchema.methods.encryptPassword=function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};
UserSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model('User', UserSchema);

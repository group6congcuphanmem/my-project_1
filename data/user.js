var User= require('../model/User.js');
var mongoose = require('mongoose');

mongoose.connect("mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1");
User.create([
{email:"thanhphong9718@gmail.com",password:"thanhphong123",img:"phong.jpg"}
])

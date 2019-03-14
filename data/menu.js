var Menu = require('../model/Menu.js');
var mongoose = require('mongoose');

mongoose.connect("mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1");
Menu.create([
  {name:"Trang chủ", meta:"trang-chu"},
  {name:"Giới thiệu", meta:"gioi-thieu"},
  {name:"Tin công nghệ", meta:"tin-cong-nghe"},
  {name:"Phụ kiện", meta:"phu-kien"},
  {name:"Khuyến mãi", meta:"khuyen-mai"},
])

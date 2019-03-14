var News =require('../model/News.js');
var mongoose =require('mongoose');

mongoose.connect("mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1")
News.create([
  {name:"Vivo NEX 2 có RAM 10GB, loa ẩn dưới màn hình, camera khẩu độ F/1.3",nameKhongDau:"",img:"new.jpg",img1:"",img2:"",des:"sdasd",des1:"sdasd",date:"",seo:"",author:"Thanh Phong"}
])

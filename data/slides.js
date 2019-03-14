var Slides= require('../model/slides.js');
var mongoose = require('mongoose');

mongoose.connect("mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1");
Slides.create([
  {name:"",meta:"ss",img:"banner.png",des1:"Hot",des2:"Khuyến mãi lớn sale 49%"},
  {name:"",meta:"ss",img:"banner1.png",des1:"Hot",des2:"Khuyến mãi lớn sale 49%"},
  {name:"",meta:"aa",img:"banner2.png",des1:"Hot",des2:"Khuyến mãi lớn sale 49%"},

// {name:"",meta:"",cateId:"",des:"",price:"",st:""}
])

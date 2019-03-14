var Cate =require('../model/Cate.js');
var mongoose =require('mongoose');

mongoose.connect("mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1");
Cate.create([
  {name:"iPhone",nameKhongDau:"iphone",},
  {name:"SamSung",nameKhongDau:"sam-sung"},
  {name:"OPPO",nameKhongDau:"op-po"},
  {name:"NOKIA",nameKhongDau:"no-ki-a"},
  {name:"SONY",nameKhongDau:"so-ny"},
  {name:"HUAWEI",nameKhongDau:"hua-wei"},
  {name:"VIVO",nameKhongDau:"vivo"},
  {name:"MOBIISTAR",nameKhongDau:"mo-bii-star"}
]);

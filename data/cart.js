var Cart =require('../model/Cart.js');
var mongoose =require('mongoose');

mongoose.connect("mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1",{useMongoClient:true});
Cart.create([
{name:"",email:"",sdt:"",msg:"",cart:"",st:"",ngay:"2018/01/01"}
]);

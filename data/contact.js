var Contact =require('../model/Contact.js');
var mongoose =require('mongoose');

mongoose.connect("mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1",{useMongoClient:true});
Contact.create([
{name:"",email:"",sdt:"",msg:"",ngay:""}
]);

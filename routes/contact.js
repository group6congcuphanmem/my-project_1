var express = require('express');
var router = express.Router();

var Contact = require('../model/Contact.js');


router.get('/',checkAdmin, function(req, res, next) {
  res.redirect('/admin/contact/danh-sach.html');
});

router.get('/danh-sach.html',checkAdmin, function(req, res, next) {
  Contact.find().then(function(data) {
    res.render('admin/contact/danhsach', {
      data: data
    });
  });
});
module.exports = router;
function checkAdmin(req, res, next){

    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap.html');
    }
}

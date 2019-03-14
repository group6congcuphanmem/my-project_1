var express = require('express');
var router = express.Router();

var Cate = require('../model/Cate.js');
var Slides = require('../model/Slides.js');
var Menu = require('../model/Menu.js');

function bodauTiengViet(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/ /g, "-");
  str = str.replace(/\./g, "-");
  return str;
}

/* GET home page. */
router.get('/', checkAdmin, function(req, res, next) {
  res.redirect('/admin/menu/danh-sach.html');
});

router.get('/danh-sach.html', checkAdmin,function(req, res, next) {
  Menu.find().then(function(data) {
    res.render('admin/menu/danhsach', {
      data: data
    });
  });
});

router.get('/them-menu.html',  checkAdmin,function(req, res, next) {
  res.render('admin/menu/them', {
    errors: null
  });
});


router.post('/them-menu.html', function(req, res, next) {
  //res.render('admin/cate/them');
  req.checkBody('name', 'Giá Trị không được rổng').notEmpty();
  req.checkBody('name', 'Name 5 đến 32 ký tự').isLength({
    min: 3,
    max: 32
  });
  var errors = req.validationErrors();
  if (errors) {
    res.render('admin/menu/them', {
      errors: errors
    });
  }
  var menu = new Menu({
    name: req.body.name,
    meta: bodauTiengViet(req.body.name)
  });

  menu.save().then(function() {
    req.flash('success_msg', 'Đã Thêm Thành Công');
    res.redirect('/admin/menu/them-menu.html');
  });
});

router.get('/:id/sua-menu.html',  checkAdmin,function(req, res, next) {
  Menu.findById(req.params.id, function(err, data) {
    res.render('admin/menu/sua', {
      errors: null,
      data: data
    });
  });
});

router.post('/:id/sua-menu.html', function(req, res, next) {
  req.checkBody('name', 'Giá Trị không được rổng').notEmpty();
  req.checkBody('name', 'Name 5 đến 32 ký tự').isLength({
    min: 3,
    max: 32
  });
  var errors = req.validationErrors();
  if (errors) {
    Menu.findById(req.params.id, function(err, data) {
      res.render('admin/menu/sua', {
        errors: errors,
        data: data
      });
    });
  } else {
    Menu.findById(req.params.id, function(err, data) {
      data.name = req.body.name;
      data.meta = bodauTiengViet(req.body.name);
      data.save();
      req.flash('success_msg', 'Đã Sửa Thành Công');
      res.redirect('/admin/menu/' + req.params.id + '/sua-menu.html');
    });
  }

});

router.get('/:id/xoa-menu.html', checkAdmin, function(req, res, next) {

  Menu.findById(req.params.id).remove(function() {
    req.flash('success_msg', 'Đã Xoá Thành Công');
    res.redirect('/admin/menu/danh-sach.html');
  });
});

function checkAdmin(req, res, next) {

  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/admin/dang-nhap.html');
  }
}
module.exports = router;

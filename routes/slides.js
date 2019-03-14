var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
var upload = multer({
  storage: storage
});

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

var Cate = require('../model/Cate.js');
var Product = require('../model/Product.js');
var Slides = require('../model/Slides.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/admin/product/danh-sach.html')
});

router.get('/danh-sach.html', checkAdmin,function(req, res) {

  Slides.find().then(function(pro) {
    res.render('admin/Slides/danhsach', {
      product: pro
    });
  });
});

router.get('/them-slide.html',  checkAdmin,function(req, res) {
  Slides.find().then(function(cate) {
    res.render('admin/slides/them', {
      errors: null,
      cate: cate
    });
  });
});


router.post('/them-slide.html', upload.single('hinh'), function(req, res) {

  //req.checkBody('hinh', 'Hình không được rổng').notEmpty();

  req.checkBody('des', 'Chi tiết không được rổng').notEmpty();
  console.log(req.file);
  var errors = req.validationErrors();
  if (errors) {
    var file = './public/upload/' + req.file.filename;
    var fs = require('fs');
    fs.unlink(file, function(e) {
      if (e) throw e;
    });
    Slides.find().then(function(cate) {
      res.render('admin/slides/them', {
        errors: errors,
        cate: cate
      });
    });
  } else {
    var pro = new Slides({
      name: req.body.name,
      meta: bodauTiengViet(req.body.name),
      img: req.file.filename,
      des1: req.body.des,
      des2: req.body.des1,

    });

    pro.save().then(function() {
      req.flash('success_msg', 'Đã Thêm Thành Công');
      res.redirect('/admin/slides/them-slide.html');
    });
  }
});

router.get('/:id/sua-slides.html',  checkAdmin,function(req, res) {
  Slides.findById(req.params.id).then(function(data) {
    res.render('admin/slides/sua', {
      errors: null,
      product: data
    });
  });
});


router.post('/:id/sua-slides.html', upload.single('hinh'), function(req, res) {
  req.checkBody('des', 'Chi tiết không được rổng').notEmpty();

  var errors = req.validationErrors();
  if (errors) {

    var file = './public/upload/' + req.file.filename;
    var fs = require('fs');
    fs.unlink(file, function(e) {
      if (e) throw e;
    });

    Slides.findById(req.params.id).then(function(data) {

      res.render('admin/slides/sua', {
        errors: errors,
        product: data
      });
    });

  } else {
    Slides.findOne({
      _id: req.params.id
    }, function(err, data) {
      var file = './public/upload/' + data.img;
      var fs = require('fs');
      fs.unlink(file, function(e) {
        if (e) throw e;
      });
      data.name = req.body.name;
      data.meta = bodauTiengViet(req.body.name);
      data.img = req.file.filename;
      data.des1 = req.body.des;
      data.des2 = req.body.des1;

      data.save();
      req.flash('success_msg', 'Đã Sửa Thành Công');
      res.redirect('/admin/slides/danh-sach.html');
      //});


    });

  }

});

router.get('/:id/xoa-slides.html',  checkAdmin,function(req, res) {
  // Product.findById(req.params.id).remove(function() {
  // 	console.log(daa);
  // 	req.flash('success_msg', 'Đã Xoá Thành Công');
  // 	res.redirect('/admin/product/danh-sach.html');
  // });

  Slides.findById(req.params.id, function(err, data) {
    var file = './public/upload/' + data.img;
    var fs = require('fs');
    fs.unlink(file, function(e) {
      if (e) throw e;
    });
    data.remove(function() {
      req.flash('success_msg', 'Đã Xoá Thành Công');
      res.redirect('/admin/slides/danh-sach.html');
    })
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

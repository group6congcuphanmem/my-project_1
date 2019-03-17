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
var  News= require('../model/News.js');
/* GET home page. */
router.get('/', checkAdmin, function(req, res) {
  res.redirect('/admin/news/danh-sach.html')
});

router.get('/danh-sach.html',  checkAdmin,function(req, res) {

  News.find().then(function(pro) {
    res.render('admin/news/danhsach', {
      product: pro
    });
  });
});

router.get('/them-news.html',  checkAdmin,function(req, res) {
  News.find().then(function(cate) {
    res.render('admin/news/them', {
      errors: null,
      cate: cate
    });
  });
});

var cpUpload = upload.fields([{ name: 'img', maxCount: 1 }, { name: 'img1', maxCount: 8 }])
router.post('/them-news.html', cpUpload, function(req, res) {
  //req.checkBody('hinh', 'Hình không được rổng').notEmpty();
  req.checkBody('des', 'Chi tiết không được để trống').notEmpty();
  req.checkBody('author', 'Người đăng không được rổng').notEmpty();
  console.log(req.file);
  var errors = req.validationErrors();
  if (errors) {
    var file = './public/upload/' + req.file.filename;
    var fs = require('fs');
    fs.unlink(file, function(e) {
      if (e) throw e;
    });
    News.find().then(function(cate) {
      res.render('admin/news/them', {
        errors: errors,
        cate: cate
      });
    });
  } else {
    var news = new News({
      name: req.body.name,
      nameKhongDau: bodauTiengViet(req.body.name),
      img 			: req.files['img'][0].filename,
      img1 			: req.files['img1'][0].filename,
      img2 			: req.files['img1'][1].filename,
      des: req.body.des,
      des1: req.body.des1,
      date: req.body.date,
      seo: bodauTiengViet(req.body.name),
      author :req.body.author
    });

    news.save().then(function() {
      req.flash('success_msg', 'Đã Thêm Thành Công');
      res.redirect('/admin/news/them-news.html');
    });
  }
});

router.get('/:id/sua-news.html',  checkAdmin,function(req, res) {
  News.findById(req.params.id).then(function(data) {
    res.render('admin/news/sua', {
      errors: null,
      product: data
    });
  });
});


router.post('/:id/sua-news.html',cpUpload, function(req, res) {
  req.checkBody('des', 'Chi tiết không được rổng').notEmpty();

  var errors = req.validationErrors();
  if (errors) {

    var file = './public/upload/' + req.file.filename;
    var fs = require('fs');
    fs.unlink(file, function(e) {
      if (e) throw e;
    });

    News.findById(req.params.id).then(function(data) {

      res.render('admin/slides/sua', {
        errors: errors,
        product: data
      });
    });

  } else {
    News.findOne({
      _id: req.params.id
    }, function(err, data) {
      var file = './public/upload/' + data.img;
      var fs = require('fs');
      fs.unlink(file, function(e) {
        if (e) throw e;
      });

      data.name = req.body.name;
      data.nameKhongDau =  bodauTiengViet(req.body.name);
      data.img 			= req.files['img'][0].filename;
      data.img1 			=  req.files['img1'][0].filename;
      data.img2 		=  req.files['img1'][1].filename;
      data.des=  req.body.des;
      data.des1=  req.body.des1;
      data.date=  req.body.date;
      data.seo=  bodauTiengViet(req.body.name);
      data.author = req.body.author;

      data.save();
      req.flash('success_msg', 'Đã Sửa Thành Công');
      res.redirect('/admin/news/danh-sach.html');
      //});


    });

  }

});

router.get('/:id/xoa-news.html',  checkAdmin,function(req, res) {
  // Product.findById(req.params.id).remove(function() {
  // 	console.log(daa);
  // 	req.flash('success_msg', 'Đã Xoá Thành Công');
  // 	res.redirect('/admin/product/danh-sach.html');
  // });

  News.findById(req.params.id, function(err, data) {
    var file = './public/upload/' + data.img;
    var fs = require('fs');
    fs.unlink(file, function(e) {
      if (e) throw e;
    });
    data.remove(function() {
      req.flash('success_msg', 'Đã Xoá Thành Công');
      res.redirect('/admin/news/danh-sach.html');
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

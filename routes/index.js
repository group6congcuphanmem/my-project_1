var express = require('express');
var router = express.Router();


 var nodemailer =require('nodemailer');
var News =require('../model/News.js');
var Cate = require('../model/Cate.js');
var Product = require('../model/Product.js');
var GioHang = require('../model/giohang.js');
var Cart = require('../model/Cart.js');
var Menu = require('../model/Menu.js');
var Slides = require('../model/Slides.js');
var Contact = require('../model/Contact.js');

var countJson = function(json) {
  var count = 0;
  for (var id in json) {
    count++;
  }
  return count;
}

/* GET home page. */
router.get('/', function(req, res) {
  var giohang = new GioHang((req.session.cart) ? req.session.cart : {
    items: {}
  });
  Menu.find().then(function(menu) {
    Cate.find().then(function(cate) {
      Product.find().sort({ price:-1 }).then(function(pro) {
        Slides.find().then(function(slides) {
          Cart.find().then(function(cart) {
            var giohang = new GioHang((req.session.cart) ? req.session.cart : {
              items: {}
            });
            req.session.cart = giohang;
            res.render('sites/page/index', {
              cart: cart,
              menu: menu,
              cate: cate,
              pro: pro,
              slides: slides
            });
          });
        });
      });
    });
  });
});
//
router.get('/trang-chu.html', function(req, res) {
  Menu.find().then(function(menu) {
    Cate.find().then(function(cate) {
      Product.find().sort({ price:-1 }).then(function(pro) {
        Slides.find().then(function(slides) {
          Cart.find().then(function(cart) {
            var giohang = new GioHang((req.session.cart) ? req.session.cart : {
              items: {}
            });
            req.session.cart = giohang;
            res.render('sites/page/index', {

              cart: cart,
              menu: menu,
              cate: cate,
              pro: pro,
              slides: slides
            });
          });
        });
      });
    });
  });
});
//
router.get('/add-cart.:id', function(req, res) {
  var id = req.params.id;
  var giohang = new GioHang((req.session.cart) ? req.session.cart : {
    items: {}
  });
  Product.findById(id).then(function(data) {
    giohang.add(id, data);
    req.session.cart = giohang;
    console.log(giohang);
    res.redirect('/trang-chu.html');
  });
});


//
router.get('/gio-hang.html', function(req, res) {
  var giohang = new GioHang((req.session.cart) ? req.session.cart : {
    items: {}
  });
  var data = giohang.convertArray();
  Menu.find().then(function(menu) {
    Cate.find().then(function(cate) {
      Product.find().then(function(pro) {
        Slides.find().then(function(slides) {
          res.render('sites/page/test', {
            data: data,
            menu: menu,
            cate: cate,
            pro: pro,
            slides: slides
          });
        });
      });
    });
  });
});

//
router.get('/gioi-thieu.html', function(req, res) {
  Menu.find().then(function(menu) {
    Cate.find().then(function(cate) {
      res.render('sites/page/Gioithieu', {
        menu: menu,
        cate: cate
      });
    });
  });
});

//tin tức
router.get('/tin-cong-nghe.html', function(req, res) {
  News.find().sort({ date: -1 }).then(function(news) {
  Menu.find().then(function(menu) {
    Cate.find().then(function(cate) {
      res.render('sites/page/News', {
        menu: menu,
        cate: cate,
        news: news
      });
    });
  });
});
});
//
//
router.get('/chi-tiet-tin-tuc/:name.:id.html', function(req, res) {
  News.findById(req.params.id).then(function(data) {
  Menu.find().then(function(menu) {
    Cate.find().then(function(cate) {
      res.render('sites/page/DetailNews', {
        data: data,
        menu: menu,
        cate: cate,
      });
    });
  });
});
});



//
router.get('/danh-muc/:name.:id.html', function(req, res) {
  Product.find({
    cateId: req.params.id
  }, function(err, data) {
    Cate.find().then(function(cate) {
      Menu.find().then(function(menu) {
        res.render('sites/page/Cate', {
          product: data,
          cate: cate,
          menu: menu
        });
      });
    });
  });
});
//

router.get('/chi-tiet/:name.:id.html', function(req, res) {
  Product.findById(req.params.id).then(function(data) {
    Product.find({
      cateId: data.cateId,
      _id: {
        $ne: data._id
      }
    }).limit(4).then(function(pro) {
      Menu.find().then(function(menu) {
        Cate.find().then(function(cate) {
          res.render('sites/page/Details', {
            data: data,
            product: pro,
            menu: menu,
            cate: cate
          });
        });
      });
    });
  });
});
//

router.post('/dat-hang.html', function(req, res) {
  var giohang = new GioHang((req.session.cart) ? req.session.cart : {
    items: {}
  });
  var data = giohang.convertArray();
  var cart = new Cart({
    name: req.body.name,
    email: req.body.email,
    sdt: req.body.phone,
    msg: req.body.message,
    cart: data,
    st: 0,
    ngay: req.body.date
  });

  cart.save().then(function() {
    req.session.cart = {
      items: {}
    };
    res.redirect('/');
  });

});
//
//
//
router.get('/dat-hang.html', function(req, res) {
  var giohang = new GioHang((req.session.cart) ? req.session.cart : {
    items: {}
  });
  //var data = giohang.convertArray();
  if (req.session.cart) {
    if (countJson(req.session.cart.items) > 0) {
      Menu.find().then(function(menu) {
        Cate.find().then(function(cate) {
          Product.find().then(function(pro) {
            Slides.find().then(function(slides) {
              res.render('sites/page/checkout1', {
                errors: null,
                menu: menu,
                cate: cate,
                pro: pro,
                slides: slides
              });
            });
          });
        });
      });
    } else res.redirect('/');

  } else {
    res.redirect('/');
  }
});
//test

//
router.post('/updateCart', function(req, res) {
  var id = req.body.id;
  var soluong = req.body.soluong;
  var giohang = new GioHang((req.session.cart) ? req.session.cart : {
    items: {}
  });

  giohang.updateCart(id, soluong);
  req.session.cart = giohang;
  res.json({
    st: 1
  });

});

router.post('/delCart', function(req, res) {
  var id = req.body.id;
  var giohang = new GioHang((req.session.cart) ? req.session.cart : {
    items: {}
  });

  giohang.delCart(id);
  req.session.cart = giohang;
  res.json({
    st: 1
  });

});

router.get('/test', function(req, res) {
  res.render('sites/page/test');
});

router.get('/lien-he-voi-chung-toi.html', function(req, res) {
  Menu.find().then(function(menu) {
    Cate.find().then(function(cate) {
      Product.find().then(function(pro) {
        Slides.find().then(function(slides) {
          Cart.find().then(function(cart) {
            res.render('sites/page/Contact', {
              cart: cart,
              menu: menu,
              cate: cate,
              pro: pro,
              slides: slides
            });
          });
        });
      });
    });
  });
});

router.post('/lien-he-voi-chung-toi.html', function(req, res) {
  var errors = req.validationErrors();
  if (errors) {
    res.render('sites/page/Contact', {
      errors: errors
    });
  }

  var contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    sdt: req.body.sdt,
    msg: req.body.message,
  });
  contact.save().then(function() {
    req.flash('success_msg', 'Đã Thêm Thành Công');
    res.redirect('/trang-chu.html');
  });

});


router.post('/send', function (req, res, next) {
	var transporter = nodemailer.createTransport({ // config mail server
		service: 'Gmail',
		auth: {
			user: 'thanhphong9718@gmail.com',
			pass: 'Phong0832210125'
		}
	});
	var mainOptions = {
		from: 'Liên Hệ Từ Shop',
		to: 'supermeocon9@gmail.com',
		subject: 'Test Nodemailer',
		text: 'You recieved message from ' + req.body.email,


		html: '<p>Bạn có một liên hệ mới </b><ul><li>Tên người liên hệ:' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li>Số điện thoại: ' + req.body.sdt + '</li><li>Nội dung:' + req.body.message + '</li></ul>'
	}
	transporter.sendMail(mainOptions, function (err, info) {
		if (err) {
			console.log(err);
			res.redirect('/');
		} else {
			console.log('Message sent: ' + info.response);
			res.redirect('/');
		}
	});
});
router.get('/about', function(req, res) {

      res.render('sites/page/test1');
    });

    router.get('/tin-cong-nghe.html', function(req, res) {

          res.render('sites/page/test1');
        });


module.exports = router;

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var csrf =require('csrf');
var convertCurrency = require('nodejs-currency-converter');
//test
var crypto = require('crypto');
var multer  =   require('multer');
var fs = require('fs');
//
var storage = multer.diskStorage({
  destination: 'public/upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage });

app.get('/files', function (req, res) {
  const images = fs.readdirSync('public/upload')
  var sorted = []
  for (let item of images){
      if(item.split('.').pop() === 'png'
      || item.split('.').pop() === 'jpg'
      || item.split('.').pop() === 'jpeg'
      || item.split('.').pop() === 'svg'){
          var abc = {
                "image" : "/upload/"+item,
                "folder" : '/'
          }
          sorted.push(abc)
      }
  }
  res.send(sorted);
})

app.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
    res.redirect('back')
});

app.post('/delete_file', function(req, res, next){
  var url_del = 'public' + req.body.url_del
  console.log(url_del)
  if(fs.existsSync(url_del)){
    fs.unlinkSync(url_del)
  }
  res.redirect('back')
});
//endtest
var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var cate = require('./routes/cate');
var product = require('./routes/product');
var cart = require('./routes/cart');
var slides =require('./routes/slides');
var menu =require('./routes/menu');
var contact = require('./routes/contact');
var test = require('./routes/test');
var news = require('./routes/news');

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

var expressValidator = require('express-validator');
var flash = require('connect-flash');

//var upload = multer({ dest: '/public/uploads/' })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://shopping1:Phong01232210125@ds129484.mlab.com:29484/shopping1', { useMongoClient: true });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(session({
  secret: 'secret',
  resave: true,
  key: 'user',
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
  res.locals.session= req.session;
	next();
});


app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/admin/cate', cate);
app.use('/admin/product', product);
app.use('/admin/cart', cart);
app.use('/admin/slides', slides);
app.use('/admin/menu', menu);
app.use('/admin/contact', contact);
app.use('/admin/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('error');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

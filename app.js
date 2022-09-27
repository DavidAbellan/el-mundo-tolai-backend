var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//var session = require('express-session');
//var session = require('cookie-session');
var rootRouter = require('./routes/super-admin')
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var flash = require('connect-flash');
var hbs = require('hbs');
var cors = require('cors');
const bodyParser = require('body-parser');
const upload = require('./config/multer');
const cloudinary = require('./config/cloudinary');
const fs = require('fs');

var app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));

app.use(cors());

app.use( session( {
  secret: 'password',
  name : 'CookieFN',
  resave : true,
  saveUninitialized : true
  
  
}));
app.use(function(req, res, next){
  res.locals.session = req.session;
  
  next();
});



app.use(flash());

app.use('/',indexRouter);
app.use('/admin', adminRouter);
app.use('/super-admin', rootRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

/*Cloudinary 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/upload-images', upload.array('image'), async (req,res) => {
  const uploader = async(path) => await cloudinary.uploads(path,'Images');
    if (req.method ==='POST'){
      const urls = [];
      const files = req.files;
      for (file of files){
        const {path} = file ;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);

      }
      res.status(200).json({
        message: "image uploaded successfully!",
        data : urls
      })
    }else {
      res.status(405).json({
        err : `${req.method} method not allowed`
      })
    }
    }
 )*/


module.exports = app;

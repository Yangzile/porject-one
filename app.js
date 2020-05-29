var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

// session配置

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

// view 模板设置（模板地址，）
app.set('views', path.join(__dirname, 'views'));
// 设置一个解析器
app.set('view engine', 'ejs');
app.engine('html',ejs.renderFile);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*5 } //有效期
    })
);
// 登录拦截
app.get('*',function (req, res, next) {
      var userName =req.session.userName;
      var path =req.path;
      if( path == '/cart' || path =='/cart/addcart'||path =='/cart/deletcart'){
          if(!userName){
            res.redirect('/login');
          }
      }
      // console.log('session',userName);
      next();
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

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
app.listen(9000,function () {
    console.log('http://localhost:9000');
});
module.exports = app;


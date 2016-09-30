var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');

var indexs = require('./routes/index');
//var users = require('./routes/users');
var tests = require('./routes/test');
var testd = require('./routes/testdata');
var login = require('./routes/login');
var register = require('./routes/register');
var api_desc = require('./routes/api_desc');
var api_apply = require('./routes/api_apply');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 修改ejs模板的后缀为html
app.engine('.html', require('ejs').__express);  
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置session
app.use(session({
  secret:'bootstrapWithMongodbOnNodejs',
  name:'bootstrapWithMongodbOnNodejs',
  cookie: {maxAge: 1000*600 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: config.dbsession
  })
}));

// 设置登陆控制，session保存用户信息
app.use(function(req,res,next){
    console.log("地址是："+req.url);
    if (!req.session || !req.session.user) {
      if(req.url == '/register'){
        next();
      }
      else if(req.url != '/login'){
        console.log('redirect to login page');
        return res.redirect('/login');
      }
      else
        next();
      }
      else if (req.session.user) {
        console.log('already login');
        console.log(req.session.user);
        next();
      }
});

app.use('/', indexs);
app.use('/testd', testd);
app.use('/testd/init', testd);
app.use('/testd/new', testd);
app.use('/testd/del', testd);
app.use('/testd/update', testd);
//app.use('/users', users);
// 登陆
app.use('/login',login);
app.use('/login/logout',login);
// 注册
app.use('/register',register);

// api申请
app.use('/api_desc',api_desc);
app.use('/api_apply',api_apply);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-08-08 14:26:29
 * @version $Id$
 */


var express = require('express')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var path = require('path')
var ejs = require('ejs')
var express = require('express');
var app = express();
var files = require('./router/index.js');
app.set('port', process.env.PORT || 3333)
    // handle fallback for HTML5 history API
    // app.use(require('connect-history-api-fallback')())

app.use(bodyParser.json()); // for parsing application/json
//最大上传10M
app.use(bodyParser.raw({ limit: 1024 * 1024 * 10 })); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.set('view engine', 'jade'); // 设置模板引擎
// app.set('views', __dirname + '/views/'); // 设置模板相对路径(相对当前目录)
app.use(express.static(__dirname + '/static/'));
app.use(cookieParser());
app.use(session({
    secret: 'YTdKHY&H*&(JK=J=L-zAF&G',
    name: 'OAM_System', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 3600 * 1000 * 24 * 30 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));
// app.get('/', function(req, res) {
//     router.index(req, res);
// });

app.get(/^\/files\/(\S+)/, files.index);
app.post(/^\/files\/(\S+)/, files.index);
//监听端口
var server = app.listen(3333, function() {
    // var host = server.address().address
    // var port = server.address().port
    console.log('准备监听')

})
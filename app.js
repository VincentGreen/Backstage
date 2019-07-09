// 项目入口文件只做配置

// 加载模块
var express = require("express");
var ejs = require('ejs');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");

var app = express();

//配置允许跨域
//自定义跨域中间件
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});
//模块引擎配置
app.engine('html',ejs.__express);
app.set('view engine','html');
//静态文件加载
app.use(express.static("./public"));
app.use(express.static("./vue"));
app.use('/uploads',express.static("./uploads"))
//post数据请求处理 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// session配置
app.use(session({
    secret:"iloveyo", //验证 data+key
    resave:false,
    saveUninitialized:true
}))

// 第一模块 前台
app.use('/',require("./routers/Main"));

// 第二模块 后台
app.use('/admin',require("./routers/Admin"));

// 第三模块 Api
app.use('/api',require("./routers/Api"));

// 数据库连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/admin1916",{useNewUrlParser:true},function(err){
    if(err){
        throw Error(err);
    }else{
        //网路监听
        app.listen(3000,'127.0.0.1',()=>console.log("请访问http://127.0.0.1:3000"));
    }
})
const Controller = require("./controller");

const md5 = require("../function/md5");
const User = require("../models/User");

class AdminController extends Controller{
    constructor(){
        super();//必须初始化父类参数
        // this对象指向问题，修改this指向类。原本this指向路由
        this.index = this.index.bind(this);
    }
    //登录页面
    login(req,res){
        res.render("admin/login")
    }
    //登录验证
    loginPost(req,res){
        // 登录数据验证
        var fields = md5(req.body);//1.失败 false 2.成功 obj
        // console.log(fields);
        if(!fields){
            res.render("admin/error",{err:"请输入正确的用户名密码",url:"/admin/login",date:3000})
        }

        //测试添加用户
        // User.insertMany({"isAdmin":true,"username":"admin","password":"281c136bb4c72251cfa2af78963bec17"},function(err,result){
        //     console.log("成功添加");
        // })
        //数据库验证
        User.isUsernameAndPasswod(fields,function(result){
            if(result){
                //添加session参数
                req.session.login = 1;//登录成功
                req.session.username = fields.username;
                res.render("admin/index",req.session);
            }else{
                res.render("admin/error",{err:"请输入正确的用户名密码",url:"/admin/login",date:3000})
            }
        })
    }

    register(req,res){
        res.render("admin/register")
    }

    registerAdd(req,res){
        var mdresult = md5(req.body)
        User.insertMany({
            "username":mdresult.username,
            "password":mdresult.password,
            "isAdmin":true
        },function(err,result){
            res.render("admin/error",{err:"注册成功",url:"/admin/login",date:3000})
        })
    }

    //验证是否登录，过滤后台连接
    validate(req,res,next){
        if(req.session.login == "1"){
            next();
        }else{
            res.render("admin/login");
        }
    }
    //后台首页
    index(req,res){
        // res.send("后台首页");
        res.render("admin/index",req.session)
    }
    //退出登录
    out(req,res){
        req.session.login = 0;
        req.session.username = null;
        res.render("admin/login");
    }
}

module.exports = new AdminController;
var controller = require("./controller");
var Api = require("../models/apiData");
var ApiName = require("../models/apiData.1");
var ApiCity = require("../models/apiData.2");
var ApiImg = require("../models/apiData.3");

class Apicontroller extends controller{
    constructor(){
        super();
    }
    Data(req,res){
        Api.getApiDateAndCount(20,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = Math.ceil(num);
            res.render("admin/ApiPoetry",req.session)
        })
        // Api.find({},function(err,result){
        //     req.session.result = result;
        //     res.render("admin/Api",req.session)
        // })
    }

    Name(req,res){
        ApiName.getApiDateAndCount(20,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = Math.ceil(num);
            res.render("admin/ApiName",req.session)
        })
    }

    City(req,res){
        ApiCity.getApiDateAndCount(20,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = Math.ceil(num);
            res.render("admin/ApiCity",req.session)
        })
    }

    Img(req,res){
        ApiImg.getApiDateAndCount(20,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = Math.ceil(num);
            res.render("admin/ApiImg",req.session)
        })
    }

    Del(req,res){
        console.log(req.query.id);
        var id = req.query.id;
        Api.deleteOne({"_id":id},function(err,result){
            if(err){
                res.render("/admin/error",{err:"数据操作失败",url:"/admin/Api",date:3000});
                return;
            }
            res.redirect("/admin/Api");
        })
    }
    DelCity(req,res){
        var id = req.query.id;
        ApiCity.deleteOne({"_id":id},function(err,result){
            if(err){
                res.render("/admin/error",{err:"数据操作失败",url:"/admin/Api",date:3000});
                return;
            }
            res.redirect("/admin/Api/City");
        })
    }
    DelImg(req,res){
        var id = req.query.id;
        ApiImg.deleteOne({"_id":id},function(err,result){
            if(err){
                res.render("/admin/error",{err:"数据操作失败",url:"/admin/Api",date:3000});
                return;
            }
            res.redirect("/admin/Api/Img");
        })
    }
    DelName(req,res){
        var id = req.query.id;
        ApiName.deleteOne({"_id":id},function(err,result){
            if(err){
                res.render("/admin/error",{err:"数据操作失败",url:"/admin/Api",date:3000});
                return;
            }
            res.redirect("/admin/Api/Name");
        })
    }
}

module.exports = new Apicontroller
const Controller = require("./controller");
const Category = require("../models/Category");

class CategoryController extends Controller{
    constructor(){
        super()
    }
    index(req,res){
        console.log(req.query.page)
        Category.getCategoryDataAndCount(3,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = Math.ceil(num);
            res.render("admin/category",req.session);
        })
        // Category.find({},function(err,result){
        //     req.session.result = result;
        //     res.render("admin/category",req.session);
        // })
    }
    add(req,res){
        res.render("admin/categoryAdd",req.session);
    }
    addPost(req,res){
        Category.insertMany(req.body,function(err,result){
            if(err){
                res.render("/admin/error",{err:"数据操作失败",url:"/admin/category",date:3000});
                return;
            }
            res.redirect("/admin/category");
        })
    }
    edit(req,res){
        res.send("后台分类修改")
    }
    del(req,res){
        var id = req.query.id;
        Category.deleteOne({"_id":id},function(err,result){
            if(err){
                res.render("/admin/error",{err:"数据操作失败",url:"/admin/category",date:3000});
                return;
            }
            res.redirect("/admin/category");
        })
    }

    find(req,res){
        Category.find({"name":req.body.user},function(err,result){
            req.session.result = result;
            if(err) throw err;
            res.render("admin/category",req.session);
        })
    }
}

module.exports = new CategoryController;
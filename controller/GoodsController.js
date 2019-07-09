var controller = require("./controller");
var Goods = require("../models/Goods");
var fs = require("fs");

var uploads = require("../function/uploads")

class GoodsController extends controller{
    constructor(){
        super();
    }
    //数据显示首页
    index(req,res){
        // console.log(req.query.page)
        Goods.getGoodsDataAndCount(3,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = Math.ceil(num);
            res.render("admin/goods",req.session);
        })
    }
    //跳转添加数据
    add(req,res){
        res.render("admin/GoodsAdd",req.session);
    }
    // 提交数据
    addPost(req,res){
        // console.log(req.body)
        Goods.insertMany(req.body,function(err,result){
            if(err){
                res.render("/admin/error",{err:"数据操作失败",url:"/admin/goods",date:3000});
                return;
            }
            res.redirect("/admin/goods");
        })
    }
    //更新数据
    upload(req,res){
        //上传图片功能
        uploads.init(req,function(data){
            if(data.err == 200){
                res.json(data);
            }else{
                res.render("admin/error",{err:data.err,url:"/admin/goods/add",data:3000})
            }
        })
    }
    //跳转修改
    edit(req,res){
        // console.log(req.query.id)
        Goods.find({"_id":req.query.id},function(err,result){
            if(err){
                res.render("admin/error",{err:"查询失败",url:"/admin/goods",date:3000})
                return;
            }
            req.session.result = result;
            res.render("admin/GoodsEdit",req.session);
        })
    }
    //修改
    editData(req,res){
        console.log(req.body);
        Goods.updateOne({"_id":req.body.id},req.body,function(err,result){
            if(err){
                res.render("admin/error",{err:"无法修改",url:"/admin/goods",date:3000})
                return;
            }
            req.session.result = result;
            res.redirect("/admin/goods")
        })
    }
    //双击图片删除
    deleteImg(req,res){
        fs.unlink("./"+ req.body.url,function(err){
            res.send("1")
            return;
        })
    }
    //删除数据
    del(req,res){
        Goods.DelDataAndImages(req.query.id,function(){
            res.redirect("/admin/goods");
            return;
        })
        // var img = result.imgs;
            // var thumbnail = result.thumbnail;
            // for(var i = 0; i < img.length; i++){
            //     fs.unlink("./"+ img[i],function(err){})
            // }
            // fs.unlink("./"+ thumbnail,function(err){})
            // Goods.deleteOne({"_id":req.query.id},function(err,result){})
            // res.redirect("/admin/goods");
            //异步需要闭包
    }
}

module.exports = new GoodsController;
var mongoose = require("mongoose");
var fs = require("fs");

var GoodsSchema = mongoose.Schema({
    // 分类id
    category:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:"Category"
    },
    // 标题
    title:{
        type:String,
        default:""
    },
    // 地址
    address:{
        type:String,
        default:""
    },
    // 价格
    price:{
        type:String,
        default:""
    },
    // 旧价格
    oldPrice:{
        type:String,
        default:""
    },
    // 收藏
    iscollect:{
        type:Boolean,
        default: false
    },
    // 简介
    description:{
        type:String,
        default:""
    },
    // 内容
    content:{
        type:String,
        default:""
    },
    // 缩略图
    thumbnail:{
        type:String,
        default:""
    },
    // 多图
    imgs:{
        type:Array
    },
    // 添加时间
    addTime:{
        type:Date,
        default:new Date()
    }
})

GoodsSchema.statics.getGoodsDataAndCount = function(limit,pageDate,callback){
    var page = 0;
        if(pageDate != undefined){
            page = pageDate;
        }
        var _this = this;
        _this.find().limit(3).skip(page*limit).sort({_id:-1}).then(function(result){
            _this.find({}).count().then(function(num){
                callback(result,Math.ceil(num/limit));
            })
        })
}

GoodsSchema.statics.DelDataAndImages = function(id,callback){
    var _this = this;
    _this.findOne({"_id":id},function(err,result){
        result.imgs.push(result.thumbnail);
        _this.deleteOne({"_id":id},function(err){
            if(result.imgs.length != 0){
                (function add(i){
                    if(i == result.imgs.length){
                        callback();
                    }
                    fs.unlink("./"+ result.imgs[i],function(){
                        add(i+1);
                    })
                }(0))
            }else{
                callback();
            }
        })  
    })
}

module.exports = mongoose.model("Goods",GoodsSchema);
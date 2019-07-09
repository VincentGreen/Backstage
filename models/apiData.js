var mongoose = require("mongoose");

var http = require("https")

mongoose.connect("mongodb://127.0.0.1:27017/admin1916",{useNewUrlParser:true},function(err){
    if(err){
        throw Error("数据库连接失败")
    }else{
        console.log("数据库连接成功")
    }
})

var apiSchema = mongoose.Schema({
    "title": String,
    "content": String,
    "authors": String
})

apiSchema.statics.getApiDateAndCount = function(limit,pageDate,callback){
    var page = 0;
    if(pageDate != undefined){
        page = pageDate;
    }
    var _this = this;
    _this.find().limit(limit).skip(limit*page).then(function(result){
        _this.find().count().then(function(num){
            callback(result,Math.ceil(num/limit))
        })
    })
}

module.exports = mongoose.model("Api",apiSchema);

var url = 'https://api.apiopen.top/likePoetry?name=%E6%9D%8E%E7%99%BD';

http.get(url,(res)=>{
    var data = "";
    res.on("data",(chunk)=>{
        data += chunk;
    })
    res.on("end",()=>{
        // Api.deleteMany({},function(err,result){
        //     if(err){
        //         console.log("数据删除失败")
        //     }else{
        //         console.log("数据删除成功");
        //     }
        // })
        //字符串转json
        var jsondata = JSON.parse(data);
        // //数据遍历数据库
        var apijson = jsondata.result;
        // console.log(apijson)
        // // console.log(api)
        // for(var key in apijson){
        //     Api.insertMany({
        //         "title": apijson[key].title,
        //         "content": apijson[key].content,
        //         "authors": apijson[key].authors
        //     },function(err,doc){
        //         console.log(doc[0].title + "----" + doc[0].id + "---" + doc[0].content);
        //     })
        // }
    })
}).on("err",()=>{
    console.log("数据请求失败");
})
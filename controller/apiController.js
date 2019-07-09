var controller = require("./controller");

var category = require("../models/Category");

class apiController extends controller{
    constructor(){
        super();
    }
    getApi(req,res){
        category.find(function(err,result){
            console.log(result);
            res.json({"code":200,"data":"成功",result})
        })
    }
}

module.exports = new apiController;
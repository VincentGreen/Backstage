var controller = require("./controller");

class GoodsApiController extends controller{
    constructor(){
        super();
    }
    index(req,res){
        res.send("Api商品首页")
    }
    list(req,res){
        res.send("Api商品列表");
    }
}

module.exprots = new GoodsApiController;
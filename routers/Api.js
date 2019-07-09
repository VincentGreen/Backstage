var express = require("express");
var router = express.Router();
var apiController = require("../controller/apiController");

router.get('/',apiController.getApi);

//商品
// router.get('/goods',goodsApiController.index);
// router.get('/goods/list',goodsApiController.list);

module.exports = router;
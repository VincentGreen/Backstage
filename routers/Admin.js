var express = require("express");
var router = express.Router();
//函数 只要调用立即执行函数内代码段
//函数体 只是调用函数体，只会返回函数本身

var adminController = require("../controller/adminController");
var categoryController = require("../controller/categoryController")
var ApiController = require("../controller/ApiController(zuoye)");
var GoodsController = require("../controller/GoodsController");

router.get('/login',adminController.login);
router.post('/login',adminController.loginPost);
router.get('/register',adminController.register);
router.post('/registerAdd',adminController.registerAdd);
router.use(adminController.validate);  //能通过后台验证是否登录
router.get('/',adminController.index);
router.get('/out',adminController.out);
//分类功能

router.get('/category',categoryController.index);
router.get('/category/add',categoryController.add);
router.post('/category/add',categoryController.addPost);
router.get('/category/edit',categoryController.edit);
router.get('/category/del',categoryController.del);
router.post('/category/find',categoryController.find);

//商品功能
router.get('/goods',GoodsController.index);
router.get('/goods/add',GoodsController.add);
router.post('/goods/add',GoodsController.addPost);
router.post('/goods/upload',GoodsController.upload);
router.get('/goods/edit',GoodsController.edit);
router.post('/goods/editData',GoodsController.editData);
router.post('/goods/deleteImg',GoodsController.deleteImg);
router.get('/goods/del',GoodsController.del);

//Api接口

router.get('/Api',ApiController.Data);
router.get('/Api/del',ApiController.Del);
router.get('/Api/ApiCity/del',ApiController.DelCity);
router.get('/Api/ApiImg/del',ApiController.DelImg);
router.get('/Api/ApiName/del',ApiController.DelName);
router.get('/Api/Name',ApiController.Name);
router.get('/Api/City',ApiController.City);
router.get('/Api/Img',ApiController.Img);

module.exports = router;
var express = require("express");
var router = express.Router();

router.get('/',(req,res)=>{
    res.send("前台首页");
})

router.get('/list',(req,res)=>{
    res.send("前台列表");
})

router.get('/xq',(req,res)=>{
    res.send("前台详情")
})

module.exports = router;
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../utils/db");

// 取得的網址名稱("自行命名",callback函式)
router.get("/dish/main",async function(req,res,next){
    // 請求資料庫資料()
    // let queryresult = await db.connection.queryAsync("select * from dish")
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '主餐'")
    res.send(queryresult)
} )

router.get("/dish/side",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '附餐'")
    res.send(queryresult)
} )

router.get("/dish/dessert",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '甜點'")
    res.send(queryresult)
} )

router.get("/dish/",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish`")
    res.send(queryresult)
} )

router.get("/coupon/:id",async function(req,res,next){
    let queryresult = await db.connection.queryAsync('SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0',req.params.id)
    res.send(queryresult)
} )

router.get("/member/:id",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT m.member_id ,m.name,m.mobile FROM member m WHERE m.member_id = ?",req.params.id)
    res.send(queryresult)
} )
// 

router.post("/order",async function(req,res,next){
    let updateDeliery = await db.connection.queryAsync("INSERT INTO deliery (name,mobile,address,delivery_time,total,note,member_id) VALUES (?)");
} )

router.post('/order', async function (req, res, next) {
    const { name, mobile, address, delivery_time, total, note, member_id } =
      req.body.data
    // 缺少 total, member_id
    let sql =
      'INSERT INTO deliery (name,mobile,address,delivery_time,total,note,member_id) VALUES (?)'
    let updateDeliery = await db.connection.queryAsync(sql, [
      name,
      mobile,
      address,
      delivery_time,
      total,
      note,
      member_id,
    ])
  })

module.exports = router;

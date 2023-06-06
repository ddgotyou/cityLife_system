var express = require('express');
var router = express.Router();
const connection = require('./db') // 获取连接实例
const tokenUtil = require('../utils/tokenUtil')
const { port } = require('./config') // 获取启动参数

/* 生成跑腿订单 */
router.post('/addNewSubscribe', function (req, res, next) {
    const { desAddr, getType, needContent, needType, targetAddr, time, token } = req.body;
    let userId = tokenUtil.verifyToken(token);
    //判定身份，生成token返回
    const sql = `insert into errandlist( needType,getType, desAddr,targetAddr, description,time,userId) values("${needType}",${getType},"${desAddr}","${targetAddr}","${needContent}","${time}",${userId})`;
    connection.query(sql, (err, users) => {

        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        } else {
            // 将 MySQL 查询结果作为路由返回值
            res.send({
                code: "200",
                message: "跑腿订单发布成功",
            });
        }
    })
});


module.exports = router;

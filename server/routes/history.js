var express = require('express');
var router = express.Router();
const connection = require('./db') // 获取连接实例
const tokenUtil = require('../utils/tokenUtil')
const { port } = require('./config') // 获取启动参数

/* 登录 */
router.post('/addHistory', function (req, res, next) {
    const { token, historySearch, sector, time } = req.body;
    let userId = tokenUtil.verifyToken(token);//验证token

    //判定身份，生成token返回
    const sql = `insert into history(historySearch,userId,time,sector) values("${historySearch}",${userId},"${time}",${sector})`;
    console.log(sql);
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
                message: "搜索成功",
            });
        }
    })
});


module.exports = router;

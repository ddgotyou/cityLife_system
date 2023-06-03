var express = require('express');
var router = express.Router();
const connection = require('./db') // 获取连接实例
const tokenUtil = require('../utils/tokenUtil')
const { port } = require('./config') // 获取启动参数


/*获取某商家或者商品的所有评价*/
router.get('/getBusiComment', function (req, res, next) {
    const { busiId, tType, token } = req.query;
    //传回来用户参数有：typeid和用户id，可以获取用户画像，从而可后续实现个性化推荐
    const sql = `select * from comment where tId=${busiId} and tType='${tType}'`;
    connection.query(sql, (err, cList) => {
        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        } else {
            if (cList.length) {//找到
                // 将 MySQL 查询结果作为路由返回值
                res.send({
                    code: "200",
                    message: "获取成功",
                    data: cList
                });
            }

        }
    })
})


/*发布评论*/



module.exports = router;
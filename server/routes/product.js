var express = require('express');
var router = express.Router();
const connection = require('./db') // 获取连接实例
const tokenUtil = require('../utils/tokenUtil')
const { port } = require('./config') // 获取启动参数


/*获取某分类下的所有商品列表*/
router.get('/getProduct', function (req, res, next) {
    const { type, token } = req.query;
    //传回来用户参数有：typeid和用户id，可以获取用户画像，从而可后续实现个性化推荐
    const sql = `select * from product where type=${type}`;
    connection.query(sql, (err, pList) => {
        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        } else {
            if (pList.length) {//找到
                // 将 MySQL 查询结果作为路由返回值
                res.send({
                    code: "200",
                    message: "获取成功",
                    data: pList
                });
            }

        }
    })
})

/*获取某个商家的所有商品列表*/
router.get('/getBusiProduct', function (req, res, next) {
    const { busiId, token } = req.query;
    //传回来用户参数有：typeid和用户id，可以获取用户画像，从而可后续实现个性化推荐
    const sql = `select * from product where busiId=${busiId}`;
    connection.query(sql, (err, pList) => {
        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        } else {
            if (pList.length) {//找到
                // 将 MySQL 查询结果作为路由返回值
                res.send({
                    code: "200",
                    message: "获取成功",
                    data: pList
                });
            }

        }
    })
})





module.exports = router;
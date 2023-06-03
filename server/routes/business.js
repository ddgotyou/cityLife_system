var express = require('express');
var router = express.Router();
const connection = require('./db') // 获取连接实例
const tokenUtil = require('../utils/tokenUtil')
const { port } = require('./config') // 获取启动参数


/*查找获得所有美食类商家,获得商家列表*/
router.get('/getBusiness', function (req, res, next) {
    const { type, token } = req.query;
    //传回来用户参数有：typeid和用户id，可以获取用户画像，从而可后续实现个性化推荐

    const sql = `select * from business where type=${type}`;
    connection.query(sql, (err, busiList) => {
        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        } else {
            if (busiList.length) {//找到
                // 将 MySQL 查询结果作为路由返回值
                res.send({
                    code: "200",
                    message: "获取成功",
                    data: busiList
                });
            }
            else {
                res.send({
                    code: "500",
                    message: "商家获取失败!",
                });
            }

        }
    })

})

/*得到每个分类下面的例子*/
router.get('/getBusinessPerCate', function (req, res, next) {
    const { cate, type } = req.query;
    const subsql = `select busiGroup from labelrel where type=${type} and info='${cate}'`;
    connection.query(subsql, (err, busiList) => {
        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        } else {
            if (busiList.length) {//找到
                // let qArr = busiList[0].busiGroup.split(',');
                let sql = `select * from business where id in (${busiList[0].busiGroup})`;
                console.log(sql)
                connection.query(sql, (err, bList) => {
                    if (err) {
                        res.send({
                            code: "500",
                            message: err,
                        });
                    }
                    else {
                        console.log(bList)
                        if (bList.length) {
                            res.send({
                                code: "200",
                                message: "获取成功",
                                data: bList
                            })
                        }
                    }
                });

            }

        }
    })

})


/*查找某商家的具体信息*/
router.get('/getBusiDetail', function (req, res, next) {
    const { busiId } = req.query;


    const sql = `select * from business where id=${busiId}`;
    connection.query(sql, (err, info) => {
        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        } else {
            if (info.length) {//找到唯一一个商家，精准查找
                // 将 MySQL 查询结果作为路由返回值
                res.send({
                    code: "200",
                    message: "获取成功",
                    data: info[0]
                });
            }
            else {
                res.send({
                    code: "500",
                    message: "商家获取失败!",
                });
            }

        }
    })
})



module.exports = router;
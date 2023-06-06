var express = require('express');
var router = express.Router();
const connection = require('./db') // 获取连接实例
const tokenUtil = require('../utils/tokenUtil')
const { port } = require('./config') // 获取启动参数


/*获取某商家或者商品的所有评价*/
router.get('/getBusiComment', function (req, res, next) {
    const { busiId, tType, token } = req.query;
    //传回来用户参数有：typeid和用户id，可以获取用户画像，从而可后续实现个性化推荐
    const sql = `select * from comments where tId=${busiId} and tType='${tType}'`;
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
router.post('/submitComment', function (req, res, next) {
    const { tId, tType, content, rank, time, token } = req.body;
    let userId = tokenUtil.verifyToken(token);

    //-------rank是sql保留字,直接用报错！！！用反引号表示列

    //传回来用户参数有：typeid和用户id，可以获取用户画像，从而可后续实现个性化推荐
    const userSql = `select name from user where id=${userId}`;
    connection.query(userSql, (err, u) => {
        if (err) {
            res.send({
                code: "500",
                message: err,
            });
        }
        else {
            if (u) {
                let userName = u[0].name;
                const sql = `insert into comments( userId,tId,tType,content,userName,\`rank\`,time)  values(${userId},${tId},"${tType}","${content}","${userName}",${rank},"${time}")`;
                console.log(sql);
                connection.query(sql, (err, cList) => {
                    if (err) {
                        res.send({
                            code: "500",
                            message: err,
                        });
                    } else {
                        // 将 MySQL 查询结果作为路由返回值
                        res.send({
                            code: "200",
                            message: "评论成功",

                        });

                    }
                })
            }
        }
    });

})


module.exports = router;
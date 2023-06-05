var express = require('express');
var router = express.Router();
const connection = require('./db') // 获取连接实例
const tokenUtil = require('../utils/tokenUtil')
const { port } = require('./config') // 获取启动参数

/* 登录 */
router.post('/submit', function (req, res, next) {
  const { userId, password, token } = req.body;
  //let toQuery = true;
  //if (token) {//存在token，直接验证
  //const id = tokenUtil.verifyToken(token);
  //if (id !== -1) {
  //toQuery = false;
  //res.send({
  // code: "200",
  //  message: "登录成功",
  // });
  // }
  // }
  //-----else  过期需要重新登录

  //判定身份，生成token返回
  const sql = `select id from user where name='${userId}' and password='${password}'`;
  connection.query(sql, (err, users) => {
    //console.log(users[0].id);
    if (err) {
      res.send({
        code: "500",
        message: err,
      });
    } else {
      if (users.length) {//找到
        // 将 MySQL 查询结果作为路由返回值
        res.send({
          code: "200",
          message: "登录成功",
          token: tokenUtil.setToken(users[0].id, 'user', "24h"),
          id: users[0].id
        });
      }
      else {
        res.send({
          code: "500",
          message: "该用户不存在,请先注册!",
        });
      }

    }
  })
});



// 注册
router.post('/setUser', function (req, res, next) {
  const { name, password, email } = req.body;
  const sql = `insert into user(name,password,email) values("${name}","${password}","${email}")`;
  connection.query(sql, (err, user) => {
    if (err) {
      res.send({
        code: "500",
        message: err,
      });
    }
    else {
      res.send({
        code: "200",
        message: "注册成功",
      });
    }
  })
});


//返回用户画像
router.get('/feature', function (req, res, next) {
  const { token } = req.query;
  let userId = tokenUtil.verifyToken(token);
  const sql = `select historySearch from history where userId=${userId}`;
  connection.query(sql, (err, h) => {
    if (err) {
      res.send({
        code: "500",
        message: err,
      });
    }
    else {
      res.send({
        code: "200",
        message: "获取画像成功",
        data: h
      });
    }
  })

})




module.exports = router;

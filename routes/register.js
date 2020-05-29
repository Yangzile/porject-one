var express = require('express');
var router = express.Router();
var mysql=require('../model/mysql.js');

var data;
router.use(function(req,res,next) {
    data = {
        code: 0,
        message: '',
        userinfo: ''
    };
    next();
})


router.get('/', function(req, res, next) {
    res.render('register.html', { title: '注册' });
});
router.post('/', function(req, res, next) {
        res.statusCode =302;
        res.statusMessage='Found';
        res.setHeader('location','/login');
        res.end();
    // res.render('login.html', { title: '登录' });
});
router.post('/user', function(req, res, next) {

    if (!req.body.userName) return res.send({ "error": 403, "message": "用户名未填写！" });
    if (!req.body.passWord) return res.send({ "error": 403, "message": "密码未填写！" });
    if (!req.body.email) return res.send({ "error": 403, "message": "用户邮箱未填写！" });


    var name = req.body.userName;
    var pwd = req.body.passWord;
    var pwd1=req.body.passWord1;
    var email =req.body.email;
    var user = [name,pwd,email];
    var sql ='insert into user(userName,passWord,email) values(?,?,?)';
    var queryAll='select * from user';

    mysql.query(queryAll,function (err, result) {
        var isTrue = false;
        if (err) {
            console.log('查询全部失败');
            throw err;
            return res.send({ "error": 403, "message": "查询sql数据库异常！" });
        }    //查询全部错误信息
        if(result){ //获取用户列表，循环遍历判断当前用户是否存在
            for (var i=0;i<result.length;i++) {
                if(result[i].userName == name && result[i].passWord == pwd) {
                    isTrue = true;
                    console.log('用户已存在');
                    return res.send({ "error": 403, "message": "用户名已经存在!!!" });
                }
            }
        }
        if (!isTrue) {
            mysql.queryArgs(sql,user,function (err, result) {
                if (err){
                        console.log('插入sql注册失败');
                        throw err;
                        return res.send({ "error": 403, "message": "数据库异常！" });
                } else {
                        console.log('注册成功后端');
                    return  res.send({ "success": true });
                }
            });
        }else {
            return res.send({ "error": 403, "message": "已注册过" });
        }


    });






});

module.exports = router;
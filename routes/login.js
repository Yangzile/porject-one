var express = require('express');
var router = express.Router();
var mysql=require('../model/mysql.js');
var data={};
router.get('/', function(req, res, next) {
    res.render('login.html', { title: '登录' });
});

router.post('/',function (req, res, next) {
    // 从连接池获取连接
        var sql='SELECT * FROM user WHERE userName =? and passWord =?';
        var UserName = req.body.userName;
        var Password = req.body.passWord;
        var user=[UserName,Password];
        mysql.queryArgs(sql,user, function (err, result) {
            if(err){
                console.log(err);
                return res.send({ "error": 403, "message": "数据库异常！" });
            }
            if(result.length==0){
                console.log('用户名密码不正确');
                return res.send({ "error": 403, "message": "密码错误！" });
                // res.render('login.html', { title: '登录' });
                // res.end({code:0,msg:"用户名密码不正确"});    //    数据库里面没找到配对的内容返回参数
            }else {
                data.title='品优购 - 优质！优质！';
                data.url='/loginout';
                data.loginstatu='注销';
                req.session.userName=UserName;
                data.userName=UserName;
                // return res.render('index.html', {data:data});
                 return  res.send({ "success": true });
            }
        });
});
module.exports = router;
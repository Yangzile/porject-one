var express = require('express');
var router = express.Router();
var mysql=require('../model/mysql.js');


var data={
    title:'',
    userName:'',
    loginstatu:'',
    url:'',
};
var arr=[];

 router.get('/', function(req, res, next) {
     data.title='品优购 - 优质！优质！';
     if (req.session.userName) {
         data.userName=req.session.userName ;
         data.loginstatu='注销';
         data.url='/loginout';
     }else{
         data.url='/register';
         data.loginstatu='免费注册';
         data.userName= '你好！，请登录';
     }

     res.render('index.html', { data:data });
});
router.get('/list', function(req, res, next) {
    data.title='品优购 - 优质！优质！';
    if(req.session.userName == null){
        data.userName= '你好！，请登录';
        data.url='/register';
        data.loginstatu='免费注册';
    } else {
        data.userName=req.session.userName ;
        data.url='/loginout';
        data.loginstatu='注销';
    }
    var sql='SELECT * FROM list  ';
    mysql.queryArgs(sql, function (err, result) {
        if(err){
            console.log(err);
        }

        res.render('list.html', { data:data,arr:result });
    });


});
router.get('/item', function(req, res, next) {
    data.title='品优购 - 优质！优质！';
    data.userName=req.session.userName || '你好！，请登录';
    if(req.session.userName == null){
        data.url='/register';
        data.loginstatu='免费注册';
    } else {
        data.url='/loginout';
        data.loginstatu='注销';
    }

    res.render('item.html', {data:data });
    // res.render('item.html', { title: '品优购 - 优质！优质！' ,userName:'你好！，请登录'});
});

router.get('/cart', function(req, res, next) {
    data.title='品优购 - 优质！优质！';
    if (req.session.userName) {
        data.userName=req.session.userName ;
        data.loginstatu='注销';
        data.url='/loginout';
    }else{
        data.url='/register';
        data.loginstatu='免费注册';
        data.userName= '你好！，请登录';
    }
    var sql='SELECT cart.number,list.pice,list.attr,list.img,list.sold,list.kucun,list.Id FROM cart,list WHERE cart.listID = list.Id and cart.userID =? ' ;
    var  userID= req.session.userName;
    if(userID == undefined){
        return;
    }
    mysql.queryArgs(sql,userID, function (err, result) {
        if(err){
            console.log(err);
            return res.send({ "error": 403, "message": "数据库异常！" });
        }
        // console.log(result);
        return res.render('carts.html', { data:data ,arr:result });
    });

});

router.get('/loginout', function(req, res, next) {
    req.session.userName=null;
    res.redirect('/login');
    // res.render('cart_data.html', { title: '品优购 - 优质！优质！' ,userName:'你好！，请登录'});
});
router.get('/search', function(req, res, next) {
    data.title='品优购 - 优质！优质！';
    if (req.session.userName) {
        data.userName=req.session.userName ;
        data.loginstatu='注销';
        data.url='/loginout';
    }else{
        data.url='/register';
        data.loginstatu='免费注册';
        data.userName= '你好！，请登录';
    }
    var search_key=req.query.search_key;
    var sql="SELECT * FROM list WHERE attr like '%" + search_key + "%'" ;
    mysql.query(sql,function (err, result) {
        if(err){
            console.log(err);
        }
        res.render('list.html', { data:data,arr:result });
    });

});
router.get('/cart/addcart', function(req, res, next) {
    data.title='品优购 - 优质！优质！';
    if (req.session.userName) {
        data.userName=req.session.userName ;
        data.loginstatu='注销';
        data.url='/loginout';
    }else{
        data.url='/register';
        data.loginstatu='免费注册';
        data.userName= '你好！，请登录';
    }

    var userName= req.session.userName;
    var listName =req.query.listName;
    // var number =parsenInt(req.query.number);
    var number =req.query.number;
    number=Number(number);
    // console.log(typeof (number));
    var sql_listID= "select Id from list where attr ='"+listName+"'";
    mysql.query(sql_listID,function (err, result) {
        if(err){
            console.log(err);
            return res.send({ "error": 403, "message": "错误！" });
        }
        var listID=result[0].Id;
        // console.log(typeof(listID));
        var sql_add=" insert into cart(userID,listID,number) values('"+userName+"',"+listID+","+number+")"
        mysql.query(sql_add,function (err, result){
            if(err){
                console.log(err);
                return res.send({ "error": 403, "message": "错误！" });
            }else  return  res.send({ "success": true });

        });
    });

});
router.get('/cart/deletcart', function(req, res, next) {
    data.title='品优购 - 优质！优质！';
    if (req.session.userName) {
        data.userName=req.session.userName ;
        data.loginstatu='注销';
        data.url='/loginout';
    }else{
        data.url='/register';
        data.loginstatu='免费注册';
        data.userName= '你好！，请登录';
    }

    var userName= req.session.userName;
    var listName =req.query.listName;

    var sql_listID= "select Id from list where attr ='"+listName+"'";
    mysql.query(sql_listID,function (err, result) {
        if(err){
            console.log(err);
            return res.send({ "error": 403, "message": "错误！" });
        }
        var listID=result[0].Id.toString();
        var sql_delet=" DELETE FROM cart WHERE listID='"+ listID + "' and userID='"+ userName +"'";
        console.log('后端：',listName);
        console.log('找到商品的id：',listID,'type:',typeof (listID));
        console.log('找到用户的id：',userName,'type:',typeof (userName));
        console.log(sql_delet);
        mysql.query(sql_delet,function (err, result){
            if(err){
                console.log(err);
                return res.send({ "error": 403, "message": "错误！" });
            }
            // else  return  res.send({ "success": true });
            if(result!=null){
                console.log('删除成功');
                return  res.send({ "success": true });
            }
            else return res.send({ "error": 403, "message": "错误！" });

        });
    });

});

module.exports = router;

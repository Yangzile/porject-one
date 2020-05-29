var mysql = require('mysql');
var dbConfig = require('./mysqlconfig.js');
var pool  = mysql.createPool(dbConfig);

// 建立连接
pool .getConnection(function(err, connection) {
    if(err) console.log('MySQL数据库建立连接失败。');
    else{
        console.log('数据库建立连接成功。');
        connection.release();
    }
});
//查询全部
function query(sql,callback) {
    var str = " ";
    pool.getConnection(function(err, connection) {
        connection.query(sql, function (err,result) {
            if(err){
                console.log('[SELECT 错误]:',err.message);
            }
            str = JSON.stringify(result);
            //  var jo=JSON.parse(result); 字符串解析成json
            //数据库查询的数据保存在result中，但浏览器并不能直接读取result中的结果，因此需要用JSON进行解析
            //  console.log(result);   //数据库查询结果返回到result中
            // console.log(str);
            callback(err,result);
            connection.release();
        });
    });
}

// function query(sql, callback) {
//     pool.getConnection(function(err, connection) {
//         connection.query(sql, function(err, rows) {
//             callback(err, rows);
//             //释放链接
//             connection.release();
//         });
//     });
// }


// connect.query('select * from test where name = ? and id > ?',['testname','2'],(err,rows)=>{});
// sql 则会被query  解析成 select * from test where name = 'testname' and id > 2
// 带有占位符的args
function queryArgs(sql, args, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql, args, function(err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}


module.exports = {
    query: query,
    queryArgs:queryArgs,
}

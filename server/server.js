const fs = require('fs');
const path = require('path');
var express = require('express');


var app = express();

//返回html主界面
app.use('/index.html', function(req, res){
    fs.readFile('./src/index.html', function(err, data){
        res.end(data);
    });
});

app.use('/sse', function(req, res){
    //设置响应内容类型；必选项
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(function(){
        var rnd = Math.random().toString();

        //1 返回单个数据
        //========================================
        res.write('data:' + rnd + '\n\n');


        //2 返回拼接数据
        //========================================
        // res.write('data:' + rnd + '-');
        // res.write(rnd + '\n\n');

        //3 返回多条数据;
        //========================================
        // res.write('data:' + rnd + '-1\n\n');
        // res.write('data:' + rnd + '-2\n\n');
        //4 设置自定义事件
        //========================================

        // res.write("event: abc\n");
        // res.write("data: abc-");
        // res.write("data:" + rnd + "\n\n");


        //4 最大时间间隔: retry
        //========================================
        //浏览器默认，如果服务端没有响应，3秒后重新建立连接；
        //服务端可以设置retry: time，来指定最大时间间隔
        //测试此参数时，可以将‘服务器关闭’查看测试效果。
        //----------------------------------------
        // res.write('retry: 5000\n\n');
        // res.write('data: retry\n\n');
    },2000);
});

app.listen(8080);

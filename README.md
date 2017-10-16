SSE（server-sent Events)服务器发送事件

一、简述：

就是浏览器向服务器发送一个请求，与服务器建立连接后，服务器不断的单向往浏览器推送‘信息'的一个过程.

二、客户端支持：

借助于window.EventSource对象；实例化该对象的一个实例来实现的。

var evtSource = new EventSource(url);

url 向服务器请求的一个连接地址; 比如：http://baidu.com/sse

1、可监听的事件有：

open 成功建立连接触发

message 用于接收服务端推送的信息，对推送的信息做出响应

error 连接出错时触发 

2、支持自定义事件：

evtSource.addEventListener(event-type, fn, false)的方式来监听。event-type为用户自定义的事件名称 

3、方法：

close() 可用于关闭建立的连接

三、服务端支持(nodejs版本)，其它也可以

1、代码实现，：

const app = express();

app.use('/sse', function(req, res){

	res.setHeader('Content-Type', 'text/event-stream');
	
	setInterval(function(){
		var rnd = Math.random();
		res.write('data:' + rnd + '\n\n');
	}, 2000);

});

app.listen(8080);


2、返回数据使用说明：

格式：'data:'+ content +'\n\n';

必须以'data:'开头和以'\n\n'结尾；content可以字符串化


同时还可以指定如下字段(放在数据的上面上行)：

id: 为每条信息指定一个id

res.write('id: 1\n'); 

event: 指定事件类型， 用做于自定义事件，和addEventListener相配

res.write('event: abc\n');

retry: 最大时间间隔。

浏览器默认3秒，如果服务器没有响应，就会重新建立连接。服务器可以指定retry:1000的形式，指定新的重新建立时间。

res.write('retry: 1000\n');

四、好处：

支持断线重连、可以自定义发送的数据类型。

五、弱处：

单向数据通信，只能服务器向客户端推送信息。欠缺可交互性。














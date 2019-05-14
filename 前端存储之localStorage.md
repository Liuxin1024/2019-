# 前端存储学习总结 #

---

## localStorage学习总结 ##
什么是localStorage？？


	在HTML5中，新加入了一个localStorage特性，这个特性主要是用来作为本地存储来使用的，
	解决了cookie存储空间不足的问题，这个在不同的浏览器中localStorage会有所不同。
	
localStorage的优缺点之优点


* localStorage扩展了cookie的4K限制
* localStorage会可以将第一次请求的数据直接存储到本地，这个相当于一个5M大小的针对前端页面的数据库，相比于cookie可以节约宽带，但是这个却是只有在高版本的浏览器中才支持的。

localStorage的优缺点之缺点


* 浏览器的大小不统一，并且在ie8以上的ie版本才支持localStorage这个属性。
* 目前所有的浏览器中都会把	localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换。
* localStorage在浏览器的隐私模式下面是不可读取的。
* localStorage 本职上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。
* localSrotage 不能被爬虫抓取到。

localStorage 与 sessionStorage 的唯一区别就是localSrorage 属于永久存储，而sessionSrorage属于当会话结束的时候，sessionStorage中的键值对会被清空。


localStorage的兼容性问题
	
![avatar](https://images2015.cnblogs.com/blog/728493/201606/728493-20160626102341735-27421870.jpg)


localStorage的使用
	由于考虑到兼容性问题，使用的时候，我们需要判断浏览器是否支持localSrorage这个属性。


	if(！window.localStorage){
	        console.log("浏览器支持localstorage");
	     
	        }else{
	            //主逻辑业务
	        }


localStorage 的写入，有三种办法，这里就一一介绍一下。
	
	if(！window.localStorage){
	           console.log("浏览器支持localstorage");
	     
	        }else{
	            var storage=window.localStorage;
	            //写入a字段
	            storage["a"]=1;
	            //写入b字段
	            storage.b = 2;
	            //写入c字段
	            storage.setItem("c",3);
	            console.log(typeof storage["a"]);
	            console.log(typeof storage["b"]);
	            console.log(typeof storage["c"]);
	        }

运行后的结果如下：

![avatar](https://images2015.cnblogs.com/blog/728493/201606/728493-20160626105220610-1095267293.png)


这里也特别要说明一下localStorage的使用也是遵循同源策略的，所以不同的网站之间是不能共用相同的localStorage。


最后再控制台上面打印出来的结果是：

![](https://images2015.cnblogs.com/blog/728493/201606/728493-20160626110312391-621359725.png)


走到这一步发现，我们存储进去的是int类型，但是打印出来的确实string类型，这个与localStorage 本身的特点有关，localStorage只支持string类型的存储。


localStorage 的读取

	if(!window.localStorage){
          console.log("浏览器支持localstorage");
        }else{
            var storage=window.localStorage;
            //写入a字段
            storage["a"]=1;
            //写入b字段
            storage.b=2;
            //写入c字段
            storage.setItem("c",3);
            console.log(typeof storage["a"]);
            console.log(typeof storage["b"]);
            console.log(typeof storage["c"]);
            //第一种方法读取
            var a=storage.a;
            console.log(a);
            //第二种方法读取
            var b=storage["b"];
            console.log(b);
            //第三种方法读取
            var c=storage.getItem("c");
            console.log(c);
        }


官网推荐的是getitem\setitem 这两种方法对其进行存取。


localStorage的改

	if(!window.localStorage){
          console.log("浏览器支持localstorage");
        }else{
            var storage=window.localStorage;
            //写入a字段
            storage["a"]=1;
            //写入b字段
            storage.b=1;
            //写入c字段
            storage.setItem("c",3);
            console.log(storage.a);
            // console.log(typeof storage["a"]);
            // console.log(typeof storage["b"]);
            // console.log(typeof storage["c"]);
            /*分割线*/
            storage.a=4;
            console.log(storage.a);
        }
localStorage的删
	将localStorage的所有内容清除
	var storage=window.localStorage;
            storage.a=1;
            storage.setItem("c",3);
            console.log(storage);
            storage.clear();
            console.log(storage);

	将localStorage 中的某个键值对删除
		
	var storage=window.localStorage;
            storage.a=1;
            storage.setItem("c",3);
            console.log(storage);
            storage.removeItem("a");
            console.log(storage.a);

localStorage 的键获取

	var storage=window.localStorage;
	            storage.a=1;
	            storage.setItem("c",3);
	            for(var i=0;i<storage.length;i++){
	                var key=storage.key(i);
	                console.log(key);
	            }

注意事项

	一般我们会将JSON存入localStorage中，但是在localStorage会自动将localStorage转换成字符串形式，这个时候我们可以使用JSON.stringify()这个方法，来将JSON转换成为JSON字符串。                     

实例：

	if(!window.localStorage){
            console.log("浏览器支持localstorage");
        }else{
            var storage=window.localStorage;
            var data={
                name:'xiecanyong',
                sex:'man',
                hobby:'program'
            };
            var d=JSON.stringify(data);
            storage.setItem("data",d);
            console.log(storage.data);
        }


读取之后要将JSON字符串转换成JSON对象，使用JSON.parse()方法。


	var storage=window.localStorage;
        var data={
            name:'xiecanyong',
            sex:'man',
            hobby:'program'
        };
        var d=JSON.stringify(data);
        storage.setItem("data",d);
        //将JSON字符串转换成为JSON对象输出
        var json=storage.getItem("data");
        var jsonObj=JSON.parse(json);
        console.log(typeof jsonObj);


2019年5月13号     刘鑫
# webpack 学习 #


### 准备 ###
---
需要下载：[node官网](https://nodejs.org/zh-cn/)			</br>
然后配环境：[node环境教程](https://blog.csdn.net/luckybuling/article/details/81292855)    </br>
淘宝镜像：[淘宝镜像地址](http://npm.taobao.org/)   </br>
临时使用：	

	npm --registry https://registry.npm.taobao.org install express
持久使用
	
	npm config set registry https://registry.npm.taobao.org

配置完毕测试  两者皆可：
	
	npm config get registry           

	npm info express



### 正式开始  安装 ###
---
	webpack可以使用npm安装，新建一个空的练习文件夹，（此处命名为webpack ），
	在终端中转到该文件夹后执行下述指令就可以完成安装。

	//全局安装
	npm install -g webpack webpack-cli
	
### webpack目录结构的准备 ###
---
	在上述练习文件夹中创建一个package.json 文件，这是一个标准的npm说明文件，里面蕴含了
	丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等。
	在终端中使用npm install 命令可以自动创建package.json文件。
	
	//创建文件夹
	medir webpackdemo
	//进入
	cd webpackdemo
	//初始化    
	npm init -y       


	由于输入 npm init这个命令后，终端回问你一系列诸如项目名称，描述，坐着等信息，不过不用担心，如果你不准备在npm中发布你的模块，这些问题的答案都不重要。 
	为了方便我们在后面加上-y  就表示全部采用默认答案。
	输完上面的代码 就回出现一个package.json文件

### 创建文件夹scripts 里面创建index.js  文件 ###
---
>index.js

	const s=()=>{
	   console.log('s init')
	}

	s();

### 创建webpack.config.js文件 ###
>webpack.config.js


	const path = require("path");
	module.exports = {
	    entry:{
	        index:"./scripts/index.js"    //入口文件，若不配置webpack4将自动查找目录下的index.js 文件
	    },
	    output:{
	        filename:"[name].bundle.js",   //输出文件名，[name]表示入口文件js名
	        path:path.join(__dirname,"dist")   //输出文件路径
	    }
	}

在终端执行```webpack --mode development``` 将会生成 dist/index.bundle.js

	webpack --mode developent


创建index.html 并引入js

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>$Title$</title>
	</head>
	<body>
	$END$
	</body>
	<script src="./dist/index.bundle.js"></script>     // 这个路径就填打包完成后的js路径
	</html>


打开浏览器调试，将会看到之前设置的js 文件生效（看打印结果）

### 对css，js   进行编译打包合并成md5 ###
---
创建a.js，c.js , a.css , 更改index.js       在script 文件夹里创建:


>a.js

	import acss from './a.css'
	import c from './c.js'
	const a={
	    init(){
	        console.log("a init bbbaaa")
	    },
	    cinit(){
	       c.init()
	    }
	}
	export default a;


>c.js
	
	const c={
	    init(){
	        console.log("ccccc")
	    }
	}
	export default c;

>a.css 
	
	body{ 
	    background-color: #6b0392;
	}

>index.js
	
	import a from './a.js'
	import c from './c.js'
	const s=()=>{
	    a.init()
	    a.cinit()
	    c.init()
	    console.log('s init')
	}
	s()

  配置webpack.config.js 文件
>webpack.config.js

	const path = require("path");
	module.exports = {
	    entry: {
	        index: "./scripts/index.js"
	    },
	    output: {
	        filename: "[name].bundle.js",    
	        path: path.join(__dirname, "dist")
	    },
	    module: { // 处理对应模块
	        rules: [
	            {
	                test: /\.css$/,
	                use: [ 'style-loader', 'css-loader' ]//处理css
	            }
	        ]
	    },
	}

使用到loader 就得下载配套的loader 安装style-loader, css-loader 
	npm install style-loader css-loader --save-dev

执行 webpack --mode development 将会看到一个带md5 值的 js 文件。

### css中的图片处理 ###
---

安装url-loader,file-loader

	npm install url-loader file-loader --save-dev

修改a.css 将一张图片放到scripts 目录

	body{
	    background-image: url("./timg.jpg");
	    background-color: #a748ca;
	}



### 配置webpack.config.js文件 ###
---


	module: {
	    rules: [
	        {
	            test: /\.css$/,
	            use: [ 'style-loader', 'css-loader' ]
	        },
	        {
	            test:/\.(png|jpg|gif)$/,
	            use:[{
	                loader:'url-loader',
	                options:{
	                    outputPath:'images/',		//输出到images文件夹
	                    limit:500  	//是把小于500B的文件打成Base64的格式，写入JS
	                }
	            }]
	        }
	    ]
	},

执行webpack --mode development将会看到dist中有一个images文件夹中有一张图片，打开index.html

（如果这步出现不了图片继续往下走，需要打开打包完成后的html）
### js自动注入html文件 ###
---

使用插件html-webpack-plugin，可以将生成的js自动引入html页面，不用手动添加

安装html-webpack-plugin

	npm install html-webpack-plugin --save-dev
安装webpack webpack-cli

	npm install webpack webpack-cli --save-dev

在这的时候安装webpack 网速很慢 按了几遍没按上   换成了淘宝镜像

	npm config set registry https://registry.npm.taobao.org


[npm镜像](https://blog.csdn.net/jason_cuijiahui/article/details/79448284)

### 配置webpack.config.js文件 ###
---

	const path = require("path");
	const HtmlWebpackPlugin = require('html-webpack-plugin');//引入html-webpack-plugin
	module.exports = {
	    entry: {
	        index: "./scripts/index.js"
	    },
	    output: {
	        filename: "[name].bundle.js",
	        path: path.join(__dirname, "dist")
	    },
	    module: {
	        rules: [
	            {
	                test: /\.css$/,
	                use: [ 'style-loader', 'css-loader' ]
	            }
	        ]
	    },
	    plugins: [// 对应的插件
	        new HtmlWebpackPlugin({ //配置
	            filename: 'index.html',//输出文件名
	            template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
	        }),
	    ]
	}

执行webpack --mode development 记得要将之前手动引入的script删除，便可以看到dist那里自动生成一个index.html，打开便可以看到。


### 删除指定文件 ###
---
使用插件clean-webpack-plugin，删除指定文件，更多配置，查看[clean-webpack-plugin](https://link.juejin.im/?target=http%3A%2F%2Fnpm.taobao.org%2Fpackage%2Fclean-webpack-plugin)

	npm install clean-webpack-plugin --save-dev

配置webpack.config.js文件

	const CleanWebpackPlugin = require('clean-webpack-plugin');//引入    
	plugins: [// 对应的插件
	        new HtmlWebpackPlugin({ //配置
	            filename: 'index.html',//输出文件名
	            template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
	        }),
	        new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
	    ]

执行webpack --mode development，可以看到dist目录被删除，又生成一个新的dist，之前的js文件已经被删除。若在这报错往下看小记一下。

### 热更新，自动刷新 ###
---
我们将用到webpack-dev-server，webpack-dev-server就是一个基于Node.js和webpack的一个小型服务器，它有强大的自动刷新和热替换功能。

安装webpack-dev-server

	npm install webpack-dev-server --save-dev


### 配置webpack.config.js文件 ###
---
	const webpack = require("webpack");
	plugins: [
	    new HtmlWebpackPlugin({
	        filename: 'index.html',
	        template: './index.html',
	    }),
	    new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
	    // 热更新，热更新不是刷新
	    new webpack.HotModuleReplacementPlugin()
	],
	devServer: {//配置此静态文件服务器，可以用来预览打包后项目
	    inline:true,//打包后加入一个websocket客户端
	    hot:true,//热加载
	    contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
	    host: 'localhost',//主机地址
	    port: 9090,//端口号
	    compress: true//开发服务器是否启动gzip等压缩
	},

### 配置package.json ###
---

	"scripts": {
	  "dev": "webpack-dev-server --mode development"
	},

执行npm run dev 访问 http://localhost:9090/

### 小计一下：
	 在webpack.config.js 文件配置， 重要的entry 是入口。 output是出口 其中filename 是输出的文件名
	path 是输出的路径   module 里面的rules 配置各类文件的loader
	但是如果图片的名字是中文的话有可能会报错，还是统一使用英文。
	图片显示不出来，没找到原因 我就继续往下走  把自动注入js 写完之后 会生成一个新的html 文件 打开这个图片就好了
	然后我继续写下一步删除指定 文件	 new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录 在这一直报错
	后来查了官网  如果没有特殊需求就不用指定文件名  直接调用new CleanWebpackPlugin(), 她会默认把dist 文件下的
	所有文件都删除一遍，然后再生成新的dist， 就这么解决了
	下一个功能热更新 这一步到时没有啥 问题直接按照教程来就行了
	然后我想加一个自动打开浏览器的功能  但是一直报错。。。  继续


最后运行成功发现没有dist 文件了 
想了下 npm run dev 是开发环境     npm run build  才是打包成生产环境 
在package.json 文件里配置一下 就好了

	"scripts": {
	    "dev": "webpack-dev-server --mode development",
	    "start": "npm run dev",
	    "build": "webpack"
	  },

执行npm start  简化打开项目

执行npm run build  生成dist文件

---
### 打包图片 ###
	之前使用url-loader 可以处理js 中的图片 但是 html 中的没办法识别，这个时候使用这个就可以 
	npm install html-withimg-loader --save-dev
	然后配置如下
	 {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            }


	当我做完这一步的时候就可以正常显示图片，为了以防万一还要在js入口文件里 在引入一下   import '../index.html';  

### 字体 ###

	由于项目中要用到自己的字体，所以找了一下方法很简单 直接上代码      
	npm url-loader --save-dev
 	  {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash:5].min.[ext]",
                        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        publicPath: "fonts/",
                        outputPath: "fonts/"
                    }
                }]
            },


### less ###

	我习惯用stylus 或者less 所以自己配置了这个 先下载   需要注意的是 除了下载less-loader 还得下载style-loader
	npm install less --save-dev
	npm install style-loader css-loader less-loader --save-dev

	然后再webpack,config.js 配置  就好了
	 module: {
	        rules: [{
	            test: /\.less$/,
	            use: ['style-loader', 'css-loader', 'less-loader']
	        }]
	    }
	然后将.less文件加载到入口文件里，如在入口文件里import '../less/topHead.less';这样就可以执行webpack把.less文件进行打包了。

### 浏览器兼容 自动加前缀 ###

	npm install --save-dev postcss-loader autoprefixer
	引入  const autoprefixer = require('autoprefixer')
		{
	    test: /\.css$/,
	    use: extractTextPlugin.extract({
	        fallback: 'style-loader',
	        use: [
	            { loader: 'css-loader', 
	                options: { importLoaders: 1 } 
	            },
	            'postcss-loader'
	        ]
	    })
	
	}

### 自动打开浏览器 ###
终端输入
	
	npm install open-browser-webpack-plugin --save-dev

>webpack.config.js   引入

	const OpenBrowserPlugin = require('open-browser-webpack-plugin')// 引入自动打开浏览器

配置
		
	  plugins: [
	        new HtmlWebpackPlugin({      //生成html 模板
	            filename: 'index.html',
	            template: './index.html',
	        }),
	        new CleanWebpackPlugin(),   //清除文件
	
	
	        // 热更新，热更新不是刷新
	        new webpack.HotModuleReplacementPlugin('dist'),
	        new OpenBrowserPlugin({ url: 'http://localhost:9090' })
	    ],

当我使用这套来开发的时候发现多入口没法打包，所以仅供学习。

等学会多入口在继续更新。
### 总结完毕 ###

<div style="width:100%;height:1024px;"></div>

[build生产配置](https://blog.csdn.net/xuehu837769474/article/details/81277224)

[文章参考](https://juejin.im/post/5b2b9a00e51d45587b48075e)


> 2019年5月8号  刘鑫
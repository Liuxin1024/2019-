// /*
const path = require("path");
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin')// 引入自动打开浏览器
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入
module.exports = {
    entry: {
        index: "./index.js"      //入口文件，若不配置webpack4将自动查找目录下的index.js 文件
    },
    output: {
        filename: "[name].bundle.js", //输出文件名，[name]表示入口文件js名   [hash] 会在后面生成随机hash值   filename: "[name].bundle.[hash].js"
        path: path.join(__dirname, "dist") //输出文件路径
    },
    module: { // 处理相应模块   是花括号
        rules: [{
                test: /\.css$/, //找结尾为 .css 的文件  \ 是原意
                use: ['style-loader', 'css-loader'] //找到所有的css 文件用css-loader 来处理
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    // loader: 'url-loader',
                    loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
                    // 这句话的意思是limit 小于8192 字节的图片 转换为bs64  图片放到images这个文件夹下
                    //  名字是前面是随机的8位md5 。 图片原名 。 图片原格式
                }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']      // 处理less
            },

            {
                test: /\.(eot|woff2?|ttf|svg)$/,   //处理字体的
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
            // 使用url-loader 只能打包js 中的图片html 中的没办法识别使用这个就可以  npm install html-withimg-loader --save-dev
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
        ]
    },
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
    devServer: { //配置此静态文件服务器，可以用来预览打包后项目
        inline: true, //打包后加入一个websocket客户端
        hot: true, //热加载
        contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
        host: 'localhost', //主机地址
        port: 9090, //端口号
        compress: true, //开发服务器是否启动gzip等压缩
    },
}
// */
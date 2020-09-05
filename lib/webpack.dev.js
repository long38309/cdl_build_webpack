const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack'); //引用webpack
const devConfig = {
    devtool:'cheap-source-map',
    plugins :[
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase :'./dist', //webpack-dev-server 在dist跑服务
        hot: true,  //开启热更新
        stats:'none'
    },
}

module.exports = merge(baseConfig, devConfig);
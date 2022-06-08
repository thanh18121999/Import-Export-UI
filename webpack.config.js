const path=require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        publicPath:'/'
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader'
                }
            },
            {
                test:/\.(s*)css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].css'
        }),
        new Dotenv({
            path:process.env.NODE_ENV.trim() == "development"?"./.development.env":"./.production.env" ,
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
        //new BundleAnalyzerPlugin()
    ],
    devServer:{
        static:path.join(__dirname,'dist'),
        compress:true,
        port:3000,
        historyApiFallback:true,
        open:true
    }
}
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var rootPath = path.resolve(__dirname, './')
// var ExtractTextPlugin = require('extract-text-webpack-plugin') 报错！
// var phpHost = ''
// var studioHost = ''
console.log(process.env.NODE_ENV)
module.exports = {
    // devtool: 'source-map',
    entry: {
        main: ['console-polyfill', './src/main.js']
    },
    output: {
        path: rootPath + '/dist/',
        filename: '[name].js?[chunkhash]'
    },
    resolve: {
    },
    plugins: [
        // new ExtractTextPlugin('style.[contenthash].css'),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './src/templates/main.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.DefinePlugin({

        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest']
        // }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        //拷贝服务器资源到dist目录
        // new TransferWebpackPlugin([
        //     {from: './static'}
        // ], path.resolve(__dirname, 'src/' + _env.outputName)),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.ejs$/,
            use: 'ejs-loader'
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        },
        {
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader'}
            ]
            // use: ExtractTextPlugin.extract({
            //     fallback: 'style-loader',
            //     use: ['css-loader', 'postcss-loader']
            //   })
            // use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            // use: ExtractTextPlugin.extract({
            //     fallback: 'style-loader',
            //     use: ['css-loader', 'postcss-loader', 'less-loader']
            //   })
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader?limit=500000'
        },
        {
          test: /\.(ttf|svg|eot|woff)$/,
            use: ['file-loader']
        }
        ]
    }
}

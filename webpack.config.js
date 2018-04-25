var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var rootPath = path.resolve(__dirname, './')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var phpHost = ''
// var studioHost = ''
module.exports = {
    // devtool: 'source-map',
    entry: {
        main: ['console-polyfill', './src/main.js']
    },
    output: {
        path: rootPath + '/dist/',
        // filename: '[name].[chunkhash].js?'
        filename: '[name].js?[chunkhash]'  // 此种方式会在src链接后加上chunkhash参数，而文件名固定  保持目录干净
    },
    resolve: {
    },
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
            // use: [
            //     {loader: 'style-loader'},
            //     {loader: 'css-loader'},
            //     {loader: 'postcss-loader'}
            // ]
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader']
              })
            // use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.less$/,
            // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'less-loader']
              })
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
    },
    plugins: [
        // new ExtractTextPlugin('style.[chunkhash].css'),  // extractTextPlugin 使用chunkhash

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
        new ExtractTextPlugin('style.css？[chunkhash]'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest']
        // }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        //拷贝服务器资源到dist目录
        // new TransferWebpackPlugin([
        //     {from: './static'}
        // ], path.resolve(__dirname, 'src/' + _env.outputName)),
    ],
    optimization: {
        /*
        上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
        它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。
    
        runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
        这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
        */
        runtimeChunk: true,
    
        splitChunks: {
          /*
          默认 entry 的 chunk 不会被拆分
          因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
          所以我们可以配置成 all, 把 entry chunk 也拆分了
          */
          chunks: 'all'
        }
    }
}

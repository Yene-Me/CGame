var helpers = require('./helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {
        'app': './public/js/main.js',
        'style': './public/asset/less/main.less'
    },


    output: {
        filename: "[name].js",
        chunkFilename: "[id].js",
        path: __dirname
    },
    devtool: "source-map",

    resolve: {
        extensions: ['.js', '.less']
    },
    module: {
        loaders: [
            {
                //test   : /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                exclude: helpers.root('asset', 'css'),
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /.less$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),

        /*  new CopyWebpackPlugin([
         {from: 'src/img', to: 'img', force: true}
         ]),

         new webpack.optimize.CommonsChunkPlugin({
         name: ['app', 'vendor', 'polyfills']
         }),
         */
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
};

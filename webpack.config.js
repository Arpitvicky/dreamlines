/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: ['./src/client.js', './src/sass/main.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    // watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: { minimize: true } }, 'sass-loader'],
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false // https://github.com/webpack/webpack/issues/1496
            }
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        // https: true,
        open: true,
        compress: true,
        port: 9003,
        contentBase: path.resolve(__dirname, 'public') // the webpack-dev-server serves the files in the directory provided with contentBase
    },
    stats: { colors: true },
    devtool: 'cheap-module-eval-source-map'
};

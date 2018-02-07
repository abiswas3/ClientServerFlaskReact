
var webpack = require('webpack');
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './js/main.js',       // 
    output: {
        filename: '../server/static/bundle.js',
    },
    devServer: {
        hot: true,
        inline: true,
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    
    module: {

        rules: [{ 
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'react-hot-loader'
                }, 
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'es2016', 'react'],
                        plugins: [
                            'transform-object-rest-spread', 
                            'transform-class-properties',
                            'transform-decorators-legacy'
                        ]
                    }
                }]
        },
                {
                    test: /\.css$/,
                    loaders: ["style-loader","css-loader"]
                }
        ]
    }

    
}

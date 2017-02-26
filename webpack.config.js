const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        svg2shapescript: path.join(__dirname, 'src/js/svg2shapescript.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!postcss-loader!sass-loader'
                })
            },
            {
                test: /\.html?$/,
                exclude: /node_modules/,
                loaders: ['html-loader']
            }
        ]
    },

    resolve: {
        modules: ['src', 'node_modules']
    },

    // Plugins
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};

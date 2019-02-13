const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev_mode = process.env.NODE_ENV !== 'production'

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                  dev_mode ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader'
                ],
              }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: dev_mode ? '[name].css' : '[name].[hash].css',
            chunkFilename: dev_mode ? '[id].css' : '[id].[hash].css',
          })

    ]
};
module.exports = config;
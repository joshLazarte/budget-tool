const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: [
          '@babel/polyfill',
          './public/javascript/src/main',
        ],
    },
    output: {
        path: path.resolve(__dirname, './public/javascript/dist'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/, // include .js files
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            use: [{
                loader: 'babel-loader',
            }]
        }]
    },
    watchOptions: {
         ignored: /node_modules/,
    }
};   


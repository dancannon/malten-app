var webpack = require('webpack'),
    path = require('path'),
    AnybarWebpackPlugin = require('anybar-webpack');

module.exports = {

    entry: path.join(__dirname, '/src/app.jsx'),
    module: {
        loaders: [
            { test: /\.(js|jsx|es6)$/, exclude: /node_modules/, loaders: ['babel-loader?optional=runtime'] },
            { test: /\.(json)$/, exclude: /node_modules/, loaders: ['json-loader'] }
        ]
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: 'index.ios.js',
        libraryTarget: 'commonjs'
    },
    externals: [],
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new AnybarWebpackPlugin()
    ]
};

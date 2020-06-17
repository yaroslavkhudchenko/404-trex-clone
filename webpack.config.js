const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //  every file with a js or jsx extension Webpack pipes the code through babel-loader
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ]
};
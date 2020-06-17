module.exports = {
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
    }
};
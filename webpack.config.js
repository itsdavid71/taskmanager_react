const path = require("path");
const ExtractPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "./main.js"
    },
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        watchContentBase: true,
        historyApiFallback: true,
        progress: true 
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use:ExtractPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader' , 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractPlugin('style.css')
    ]
}


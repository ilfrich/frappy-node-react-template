const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const BUILD_DIR = path.resolve(__dirname, "static")
const APP_DIR = path.resolve(__dirname, "app", "src")

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "app/index.html",
    filename: "../static/index.html",
    inject: true,
})

const HotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin({
    multiStep: false,
})

const config = {
    entry: `${APP_DIR}/index.js`,
    output: {
        path: BUILD_DIR,
        filename: "index.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 65536,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [HTMLWebpackPluginConfig, HotModuleReplacementPluginConfig],
}

module.exports = config

const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    entry: './src/js/index.js',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            webp: {
                                lossless: true,
                            },
                        },
                    },
                },
            }),
        ],
    },
}

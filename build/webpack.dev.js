const MiniCssExtractCss = require('mini-css-extract-plugin')
const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getPluginConfigs } = require('./utils')
const { dev } = require('./config')

module.exports = smart(base, {
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: dev.publicPath
    },
    devServer: {
        port: 8080,
        progress: true,
        open: true,
        // contentBase: path.resolve(__dirname, 'dist')
        // 配置一个反向代理
        proxy: dev.proxy
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: getPluginConfigs(folder => {
        return [
            new HtmlWebpackPlugin({
                template: `${folder.path}/${folder.name}.html`,
                // 输出的hmtl路径
                filename: `${folder.name}.html`,
                // 要引入的 chunks
                chunks: [`${folder.name}`]
                // hash: true
            })
        ]
    })
    .concat([
        new MiniCssExtractCss({
            filename: '[name].css'
        })
    ])
})
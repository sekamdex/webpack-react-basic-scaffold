const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    entry: {
        app: './src/pages/app.js',
        page01: './src/pages/page01.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }, 
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devtool: 'eval-cheap-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/js/',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HTMLWebpackPlugin({
            template: 'src/index.html', 
            filename: '../index.html',
            alwaysWriteToDisk: true,
            chunks: ['app']
        }),
        new HTMLWebpackPlugin({
            template: 'src/index.html',
            filename: '../post-job.html',
            chunks: ['page01']
        }),

        new HTMLWebpackHarddiskPlugin()
    ]
}
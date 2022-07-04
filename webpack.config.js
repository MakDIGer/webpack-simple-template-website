const HtmlWebpackPlugin     = require('html-webpack-plugin'),
      MiniCssExtractPlugin  = require('mini-css-extract-plugin'),
      CssMinimizerPlugin    = require('css-minimizer-webpack-plugin'),
      CopyPlugin            = require('copy-webpack-plugin'),
      path                  = require('path')

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/script.boundle.js',
        assetModuleFilename: 'assets/[name][ext][query]'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.svg/,
                type: 'asset/resource'
            }
        ]
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
        minimize: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: false,
            filename: 'index.html',
            template: 'src/html/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src', 'img'), to: path.resolve(__dirname, 'dist', 'assets', 'img') }
            ]
        })
    ]
}
const chalk = require('chalk')
const config = require('config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

// Environment variables
const APP_NAME = config.get('appName')
const ENV = config.get('env')
const PORT = config.get('port')

console.log(
  '🔨 ',
  chalk.green('Building with environment'),
  chalk.blue.underline(ENV)
)

const webpackConfig = {
  entry: {
    frontend: ['babel-polyfill', './frontend/index.js'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    library: 'Application',
    libraryTarget: 'var',
  },
  plugins: [
    //new webpack.ProvidePlugin({
    //$: 'jquery',
    //jQuery: 'jquery',
    //}),
    new ExtractTextPlugin('[name].css'),
    //new HtmlWebpackPlugin({
    //title: config.get('appName'),
    //template: 'frontend/index.html',
    //}),
    //new webpack.DefinePlugin({
    //'process.env': JSON.stringify({
    //ENV,
    //NODE_ENV: ENV,
    //}),
    //}),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|server)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss|sass)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(svg|woff|woff2|eot|dtd|png|gif|jpg|jpeg|ttf)(\?.*)?$/,
        loader: 'file-loader',
      },
    ],
  },
}

if (ENV === 'test' || ENV === 'development') {
  webpackConfig.devtool = 'eval'
}

if (ENV === 'production') {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    })
  )
  webpackConfig.sassLoader = {
    outputStyle: 'compressed',
  }
}

module.exports = webpackConfig

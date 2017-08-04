/**
 * @file Webpack config for Hamu Software and Design boilerplate.
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2017
 * @version 0.0.1
 * @flow
 */

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname +'/build/js',
    publicPath: '/js/',
    filename: 'index.js'
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
}

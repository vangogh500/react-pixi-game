module.exports = {
  entry: './playground/index.js',
  output: {
    path: __dirname +'/playground/build/js',
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

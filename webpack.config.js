var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    library: 'react-pixi-game',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
     minimize: true,
     compress: false
    })
  ]
}

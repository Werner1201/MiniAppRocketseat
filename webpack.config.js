module.exports = {
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    // eslint-disable-next-line no-path-concat
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    // eslint-disable-next-line no-path-concat
    contentBase: __dirname + '/public'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

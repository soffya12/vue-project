const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bunlde.js'
  },

  devServer: {
    open: true,
    port: 4000
  },

  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader'},
      {test: /\.(woff|woff2|eot|svg|ttf|otf)$/, use: 'url-loader'},
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.vue$/, use: 'vue-loader'},
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html')
    })
  ]
}
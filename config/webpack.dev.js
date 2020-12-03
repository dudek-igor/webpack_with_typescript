const webpackCommon = require('./webpack.common');
const path = require('path');

module.exports = {
  ...webpackCommon,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 5000,
    host: 'localhost',
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, '../', 'dist'),
  },
};

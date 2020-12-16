const webpackCommon = require('./webpack.common');
const path = require('path');
// const webpack = require('webpack');

module.exports = {
  ...webpackCommon,
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 5000,
    host: 'localhost',
    // if hot is on we don't have livereload on *.html file
    // hot: true,
    // compress: true,
    contentBase: path.resolve(__dirname, '../', 'dist'),
  },
  plugins: [
    ...webpackCommon.plugins,
    // new webpack.HotModuleReplacementPlugin()
  ],
};

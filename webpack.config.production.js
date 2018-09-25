const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const webpack = require('webpack');

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].js',
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'webpack-report.html',
      openAnalyzer: false,
    }),
  ]
};

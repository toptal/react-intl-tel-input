/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

var webpack = require('webpack'),
    path = require('path');
var eslintrcPath = path.resolve(__dirname, '.eslintrc');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  watch: true,
  target: 'node',
  externals: [nodeExternals()],

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|libphonenumber\.js)/,
      loader: 'uglify!babel'
    }, {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('style', 'css!sass?outputStyle=expanded')
    }, {
      test: /\.png$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 3, interlaced: false, pngquant:{quality: "30-40", speed: 1}}'
      ]
    }]
  },

  eslint: {
    configFile: eslintrcPath
  }
};

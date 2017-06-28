const webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

exports.minify = function(key, value) {

  const env = {};
  env[key] = JSON.stringify(value);

  return {

    plugins: [

      new webpack.DefinePlugin(env),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          drop_console: true
        },
        mangle: {
          screw_ie8: true
        }
      })
    ]
  }
}
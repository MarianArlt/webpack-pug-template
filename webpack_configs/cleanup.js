const webpack            = require('webpack'),
      cleanWebpackPlugin = require('clean-webpack-plugin')

exports.cleanUp = function(path) {
  return {
    plugins: [
      new cleanWebpackPlugin([path], {
        // Without 'root' CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  }
}
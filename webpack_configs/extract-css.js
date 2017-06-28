const webpack            = require('webpack'),
      extractTextPlugin  = require('extract-text-webpack-plugin')

exports.extractCss = function() {

  return {

    plugins: [

      new extractTextPlugin('[name].[chunkhash].css')

    ]

  }

}
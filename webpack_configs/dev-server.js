const webpack = require('webpack');

exports.devServer = function(options) {

  return {

    devServer: {

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Where to serve content from
      contentBase: options.setPath,

      // Enable webpack's Hot Module Replacement feature:
      // Unlike CLI flag, this doesn't set HotModuleReplacementPlugin.
      hot: true,

      // By default dev-server will be served over HTTP.
      // It can optionally be served over HTTP/2 with HTTPS:
      //https: true,

      // Reduce output messages. Options are:
      // 'none', 'errors-only', 'minimal', 'normal', 'verbose'
      stats: 'minimal',
      // This option has no effect when used with 'quiet' or 'noInfo'.

      // Use gzip compression.
      compress: true,

      // Parse host and port from env to allow customization
      // 0.0.0.0 is available to all network devices unlike default `localhost`.
      host: options.setHost || '0.0.0.0',
      port: options.setPort // Defaults to 8080

    },

    plugins: [
      // Enable multi-pass compilation for enhanced performance.
      new webpack.HotModuleReplacementPlugin()

    ]

  }
};
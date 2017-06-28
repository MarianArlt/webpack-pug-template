const webpack = require('webpack')

exports.loaders = function(app) {

  return {

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          include: app
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
                localIdentName: '[path]-[local]-[hash:base64:5]'
              }
            },
            'resolve-url-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true,
                outputStyle: 'expanded'
              }
            }
          ],
          include: app
        },
        {
          test: /\.(pug)$/,
          loader: 'pug-loader',
          include: app
        },
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'image/[name].[ext]'
          },
          include: app
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]'
          },
          include: app
        },
        {
          test: /\.(ttf|eot)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          },
          include: app
        }
      ]
    } // module rules end

  } // return end

} // exports.loaders end
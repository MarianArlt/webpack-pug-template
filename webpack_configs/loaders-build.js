const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.loaders = function(app) {

  return {

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          include: app
        },
        {
          test: /\.(css|scss|sass)$/,
          use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                      {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 3,
                          localIdentName: '[hash:base64]',
                        }
                      },
                      'resolve-url-loader',
                      'postcss-loader',
                      {
                        loader: 'sass-loader',
                        options: {
                          indentedSyntax: true,
                          outputStyle: 'compressed'
                          // can be one of 'nested', 'expanded', 'compact' or 'compressed', default is 'nested'
                        }
                      }
                    ]
          }),
          include: app
        },
        {
          test: /\.(pug)$/,
          loader: 'pug-loader',
          include: app
        },
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          loader: 'file-loader?name=/image/[name].[ext]'
        },
        {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader?limit=5000&mimetype=application/font-woff&name=fonts/[name].[ext]'
        },
        {
          test: /\.(ttf|eot)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        }
      ]
    } // module rules end

  } // return end

}; // exports.loaders end
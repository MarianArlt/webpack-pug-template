// Set production variable depending on the CLI command sent.
const cli = process.env.npm_lifecycle_event;
let production;
cli == 'build' ? production = true : production = false;

// Node
const path 						= require('path'),
	  HtmlWebpackPlugin 		= require('html-webpack-plugin'),
	  WebpackMerge 				= require('webpack-merge');

// Directories
const host  = '192.168.1.2',
	  port  = '3000',
	  paths = {
			app: 		 path.join(__dirname, 'src'),
			build: 		 path.join(__dirname, 'dist'),
			dev: 		 path.join(__dirname, 'dev'),
			template: 	 path.join(__dirname, 'src', 'pug', 'index.pug'),
			stylesheet:  path.join(__dirname, 'src', 'sass', 'styles.sass'),
			server: 	`http://${host}:${port}`
	  };

const config = {
			buildLoaders: require('./webpack_configs/loaders-build'),
			devLoaders:   require('./webpack_configs/loaders-dev'),
			extract: 	  require('./webpack_configs/extract-css'),
			minify: 	  require('./webpack_configs/minify'),
			cleanup: 	  require('./webpack_configs/cleanup'),
			devServer: 	  require('./webpack_configs/dev-server'),
			common: {
				entry: production ? [
							paths.app,
							paths.stylesheet,
							paths.template
							] : [
						   `webpack-dev-server/client?${paths.server}`,
						   'webpack/hot/only-dev-server',
							paths.app,
							paths.stylesheet,
							paths.template
				],
				output: {
					path: production ? paths.build : paths.dev,
					publicPath: '',
					filename: production ? '[name].[chunkhash].js' : '[name].js',
					chunkFilename: '[chunkhash].js'
				},
				resolve: {
					extensions: ['.js', '.jsx', '.scss', '.sass', '.pug']
				},
				plugins: [
					new HtmlWebpackPlugin({
						favicon: path.join(paths.app, 'favicon.ico'),
						template: paths.template,
						inject: true // true or 'body' will place all javascript resources at the bottom of the body element; 'head' will place the scripts in the head element.
					})
				]
			}
};

// Create our merger
let mergedConfig;

// Merge for production ('nmp run build')
if (production) {
	mergedConfig = WebpackMerge (
		config.common, // See above
		config.buildLoaders.loaders(paths.app), // Loaders for production
		config.extract.extractCss(), // CSS to own file
		config.cleanup.cleanUp(path.join(paths.build, '*')), // Wipe before rebuild
		config.minify.minify(
			'process.env.NODE_ENV',
			'production'
		)
	)

// Merge for development ('npm start')
} else {
	mergedConfig = WebpackMerge (
		config.common, // See above
		config.devLoaders.loaders(paths.app), // Loaders for development
		config.devServer.devServer({
			setHost: host,
			setPort: port,
			setPath: paths.dev
		})
	)
};

// Export the merged config
module.exports = mergedConfig;
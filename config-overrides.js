const webpack = require('webpack');
const path = require("path");

module.exports = function override(config={}) {

	// config.mode =  'production'
	config.resolve =  config.resolve || {}
	config.resolve.fallback = {
		...(config.resolve.fallback || {}),
		child_process: false,
		fs: false,
		net: false,
		path: false,
		os: false,
		util: require.resolve('util'),
		http: require.resolve('http-browserify'),
		https: require.resolve('https-browserify'),
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('readable-stream'),
		// "assert": require.resolve("assert"),
		// "url": require.resolve("url")
	};

	config.resolve.alias = {
		...(config.resolve.alias || {}),
		'bn.js': path.resolve(__dirname, 'node_modules/bn.js'),
	}

	config.plugins = [

		...(config.plugins || []),
		new webpack.IgnorePlugin({
			checkResource(resource) {
				// "@ethereumjs/common/genesisStates" consists ~800KB static files which are no more needed
				return /(.*\/genesisStates\/.*\.json)/.test(resource);
			},
		}),
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
			process: 'process/browser',
		}),
	]
	config.module = config.module || {}
	config.module.rules =[
		...((config.module || {}).rules || []),

		{
			test: /\.ts$/,
			loader: 'ts-loader',
			exclude: ['/node_modules/', '/test/'],
		},

	]
	config.ignoreWarnings = [/Failed to parse source map/];
	return config;
}
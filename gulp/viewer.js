/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp');
var path = require('path');
var gutil = require("gulp-util");
var webpack = require("webpack");
var parseArgs = require('minimist')(process.argv);
var env = parseArgs.e || 'development';

var plugins = [
	new webpack.DefinePlugin({
		__DEV__: env != "production"
	}),
];

if(env != "development"){
	plugins.push(new webpack.optimize.OccurenceOrderPlugin())
	plugins.push(new webpack.NoErrorsPlugin())
	plugins.push(new webpack.optimize.DedupePlugin())
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			drop_console: true,
			unsafe: true
		}
	}))
}

var config = {
	context: path.resolve(__dirname, '../js'),
		devtool: env == "development" ? "source-map" : null,
		entry: [
		// 'babel-polyfill',
		'./main.js'
	],
		output: {
		path: path.resolve(__dirname, '../dist'),
			filename: 'all.min.js',
			publicPath: '/'
	},
	resolve: {
		extensions: ['', '.js']
	},
	plugins: plugins,
		module: {
		loaders: [{
			loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0,plugins[]=transform-class-properties'],
			include: [
				path.resolve(__dirname, '../js')
			]
		}]
	}
};
global.webpack_viewer = webpack(config);
gulp.task('viewer', function(callback){
	global.webpack_viewer.run(function(err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		
		gutil.log("[webpack]", stats.toString({
			colors: true,
			minimal: true,
			chunks: false
		}));
		
		callback();
	});
});
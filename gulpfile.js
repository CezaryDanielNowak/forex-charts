'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var path = require('path');
var _ = require('lodash')
var runServer = require('./_serve.js')


var paths = {
	scripts: [
		'src/**/*.js',
		'src/**/*.jsx'
	],
	css: [
		'src/css/**/*.css'
	]
}

var webpackConfig = {
	context: path.join(__dirname, 'src'),
	entry: 'init',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'public', 'js'),
		filename: 'app.js',
		sourceMapFilename: 'app.js.map',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /(\.js|\.jsx)$/,
				exclude: /(node_modules|public)/,
				loader: 'babel',
				query: {
					optional: ["es7.classProperties"],
					plugins: ["object-assign"]
				}
			},
		]
	},
	resolve: {
		root: [
			path.join(__dirname, 'node_modules'),
			path.join(__dirname, 'src')
		],
		extensions: ['', '.js', '.jsx'],
	}
}


gulp.task('default', [
	'copy-assets',
	'webpack-watch',
	'build-css',
], function (callback) {
	gulp.watch(paths.css, ['build-css'])
});

gulp.task('webpack-watch', function(callback) {
	var initialRun = true

	webpack(
		_.extend({}, webpackConfig, {
			devtool: 'cheap-source-map' // http://webpack.github.io/docs/configuration.html
		})
	).watch({
		poll: true
	}, function (err, stats) {
		if (initialRun) {
			initialRun = false
			runServer({
				path: "public/",
				log: gutil.log.bind(gutil)
			});
			callback()
		}
		if(err) {
			throw new gutil.PluginError("webpack", err);
		}
		gutil.log("[webpack]", stats.toString({
			timing: true,
			cached: false
		}));
		gulp.start('eslint')
	})
});

gulp.task('eslint', function() {
	gulp
		.src(paths.scripts)
		.pipe(eslint())
		.pipe(eslint.format())
});


gulp.task('build-css', function() {
	gulp
		.src(paths.css)
		.pipe(concat('style.css'))
		.pipe(gulp.dest('public/css'))
});


gulp.task('copy-assets', function() {

	gulp
		.src('node_modules/materialize-css/**')
		.pipe(gulp.dest('public/css/materialize/'));

	gulp
		.src('node_modules/vis/dist/**')
		.pipe(gulp.dest('public/js/vis/'));

	gulp
		.src('node_modules/react/dist/**')
		.pipe(gulp.dest('public/js/react/'));

	gulp
		.src('node_modules/lodash/index.js')
		.pipe(gulp.dest('public/js/lodash'));

});


gulp.task('build-production', ['build-css'], function (callback) {
	webpack(webpackConfig, callback)
});


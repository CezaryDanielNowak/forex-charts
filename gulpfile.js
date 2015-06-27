var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var path = require('path');
var extend = require('extend')


var paths = {
  scripts: [
    'src/**/*.js',
    'src/**/*.jsx'
  ],
  css: [
    'src/**/*.css'
  ]
}

var webpackConfig = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'all.js',
    sourceMapFilename: 'all.js.map',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(?:node_modules|public)/,
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
      path.join(__dirname, 'src')
    ],
    extensions: ['.js', '.jsx'],
  }
}


gulp.task('default', [
  'copy-bootstrap-assets',
  'webpack-watch',
  'build-css',
], function () {
  gulp.watch(paths.css, ['build-css'])
});

gulp.task('webpack-watch', function(callback) {
  var initialRun = true

  webpack(
    extend({}, webpackConfig, {
      devtool: 'cheap-module-eval-source-map'
    })
  ).watch({
    poll: true
  }, function (err, stats) {
    if (initialRun) {
      initialRun = false
      callback()
    }
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      timing: true,
      cached: false
    }));
    gulp.start('eslint')
  })
});

gulp.task('eslint', function () {
  gulp
    .src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
});


gulp.task('build-css', function () {
  gulp
    .src(paths.css)
    .pipe(concat('all.css'))
    .pipe(gulp.dest('build/'))
});


gulp.task('copy-bootstrap-assets', function () {
  gulp
    .src('node_modules/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('build/fonts'))
});


gulp.task('build-production', ['build-css'], function (callback) {
  webpack(webpackConfig, callback)
})


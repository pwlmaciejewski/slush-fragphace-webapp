var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var less = require('gulp-less');
var webpack = require('webpack');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var del = require('del');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

// Build
gulp.task('build', function(callback) {
  runSequence(
    'build-clean',
    'build-css',
    'build-js',
    callback
  );
});

gulp.task('build-clean', function() {
  return del([
    './public/js/*.bundle.js',
    './public/css/*.css'
  ], {
    force: true
  });
});

gulp.task('build-js', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    if (stats.hasErrors()) gutil.log("[webpack]", stats.toString({
      colors: true,
      chunks: false,
      errorDetails: true
    }));
    callback();
  });
});

gulp.task('build-css', 'Run less to create CSS files', function() {
  return gulp
    .src('./client/styles/index.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: ['./node_modules']
    }).on('error', function(err) {
      console.trace(err);
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

// Convenience tasks
gulp.task('watch', [ 'watch-assets', 'watch-app' ], function() {});

gulp.task('watch-app', 'Serve and watch the application', function() {
  return nodemon();
});

gulp.task('watch-assets', 'Watch and rebuild assets', function() {
  gulp.watch('./client/styles/**/*', [ 'build-css' ]);
  gulp.watch([
    './client/scripts/**/*',
  ], [ 'build-js' ]);
});

gulp.task('lint',  function() {
  return gulp
    .src([
      './app/**/*.js',
      './client/scripts/**/*.js',
      './client/scripts/**/*.jsx'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

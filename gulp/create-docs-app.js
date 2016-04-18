'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {
  gulp.task('create-docs-app', ['move-dev-assets-to-docs', 'move-js-to-docs', 'build-app-js']);

  gulp.task('move-dev-assets-to-docs', function () {
    return gulp.src([config.dev.assetPath + '/**/*'], {
      base: config.dev.assetPath
    })
      .pipe(gulp.dest(config.docs.assetsPath));
  });

  gulp.task('move-js-to-docs', function () {
    return gulp.src(config.dev.path + '/*.js')
      .pipe(gulp.dest(config.docs.bowerComponentsPath + '/' + config.dist.name));
  });

  gulp.task('build-app-js', function () {
    return gulp.src(config.docs.appPath + '/**/*.js')
      .pipe($.angularFilesort())
      .pipe($.concat('app.js'))
      .pipe(gulp.dest(config.docs.path));
  });

};

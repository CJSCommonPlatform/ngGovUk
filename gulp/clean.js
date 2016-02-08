'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {
  // remove the /dev folder
  gulp.task('clean-dev', ['clean-docs'], function () {
    return gulp.src(config.dev.path, {read: false})
      .pipe($.clean());
  });

  gulp.task('clean-docs', ['clean-dist'], function () {
    return gulp.src([config.docs.bowerComponentsPath + '/' + config.dist.name, config.docs.cssPath], {read: false})
      .pipe($.clean());
  });

  gulp.task('clean-dist', function () {
    return gulp.src(config.dist.path, {read: false})
      .pipe($.clean());
  });
};

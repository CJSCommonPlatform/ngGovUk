'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {
  // remove the /dev folder
  gulp.task('clean-dev', function (done) {
    return gulp.src(config.dev.path, {read: false})
      .pipe($.clean());
  });
};

'use strict';

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence');

module.exports = function (config, log) {
  gulp.task('default', function (cb) {
    if ($.util.env.dist || $.util.env.travis) {
      runSequence(['lint', 'build'], cb);
    } else {
      runSequence(['lint', 'build'], 'serve', cb);
    }
  });
};
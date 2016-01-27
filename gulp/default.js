'use strict';

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence');

module.exports = function (config, log) {
  gulp.task('default', function (cb) {
    runSequence('build', cb);
  });
};
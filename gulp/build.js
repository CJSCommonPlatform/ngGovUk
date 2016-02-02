'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gutil       = require('gulp-util');

// create standalone build
module.exports = function () {
  gulp.task('build', ['clean-dev'], function (cb) {
    if (gutil.env.dist) {
      runSequence([
        'build-css',
        'copy-assets',
        'build-js'
      ], 'move-to-docs',
        'create-dist',
        'uglify-dist', cb);
    } else {
      runSequence([
      'build-css',
        'copy-assets',
        'build-js'
      ], 'move-to-docs', cb);
    }
  });
};

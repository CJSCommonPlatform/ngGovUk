'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gutil       = require('gulp-util');

// create standalone build
module.exports = function () {
  gulp.task('build', ['clean-dev'], function (cb) {
    if (gutil.env.dist) {
      runSequence(
        'clean-dist', [
        'test',
        'build-sass',
        'copy-assets',
        'build-js',
        'copy-sass'
      ], 'build-demo',
        'move-to-docs',
        'create-dist',
        'uglify-dist', cb);
    } else {
      runSequence([
        'test',
        'build-sass',
        'copy-assets',
        'build-js'
      ], 'build-demo',
        'move-to-docs', cb);
    }
  });
};

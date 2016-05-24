'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gutil       = require('gulp-util');

// create standalone build
module.exports = function () {
  gulp.task('build', ['clean-dev'], function (cb) {
    if (gutil.env.dist) {
      runSequence([
        'test',
        'build-css',
        'copy-assets',
        'build-js'
      ], 'build-demo',
        'move-to-docs',
        'create-demo-css',
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

'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// watch files for changes and invokes respective tasks
module.exports = function (config, log) {
  gulp.task('serve', function () {
    browserSync.init({
      server: {
        baseDir: config.docs.path
      }
    });

    gulp.watch(config.src.modulesPath + '/**/*.js', ['lint', 'build-js', 'move-to-docs', browserSync.reload]);
  });
};

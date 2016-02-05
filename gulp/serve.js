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

    // watch js files in module
    gulp.watch(config.src.modulesPath + '/**/*.js', function () {
      runSequence('lint', 'build-js', 'move-to-docs', browserSync.reload);
    });

    // watch all less files
    gulp.watch([config.src.modulesPath + '/**/*.less', config.src.bootstrapWrapperPath + '/**/*.less'], function () {
      runSequence('build-css', 'move-to-docs', browserSync.reload);
    });

    //watch modules files
    gulp.watch(config.src.modulesPath + '/**/*.html', function () {
      runSequence('html-lint', 'build-js', 'move-to-docs', browserSync.reload);
    });

    //watch docs files
    gulp.watch(config.docs.path + '/**/*.html', browserSync.reload);
  });
};

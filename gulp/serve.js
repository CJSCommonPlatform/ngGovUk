'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// watch files for changes and invokes respective tasks
module.exports = function (config, log) {
  gulp.task('serve', function () {
    browserSync.init({
      server: './',
      startPath: config.docs.path
    });

    // browserSync.init({

    // });

    // -- Watch src files -- //

    // watch js files in module
    gulp.watch(config.src.modulesPath + '/**/*.js', function () {
      runSequence('lint', 'build-js', 'create-docs-app', browserSync.reload);
    });

    // watch all scss files
    gulp.watch([config.src.path + '/**/*.scss'], function () {
      runSequence('build-css', 'create-docs-app', browserSync.reload);
    });

    // watch module files
    gulp.watch(config.src.modulesPath + '/**/*.html', function () {
      runSequence('html-lint', 'build-js', 'create-docs-app', browserSync.reload);
    });

  });
};

'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// watch files for changes and invokes respective tasks
module.exports = function (config, log) {
  gulp.task('serve', function () {
    browserSync.init({
      server: './',
      port: 3003,
      startPath: config.docs.path
    });

    // browserSync.init({

    // });

    // -- Watch src files -- //

    // watch js files in module
    gulp.watch(config.src.modulesPath + '/**/*.js', function () {
      runSequence('lint', 'build-js', 'move-to-docs', browserSync.reload);
    });

    // watch all less files
    gulp.watch(['./src/**/*.scss'], function () {
      runSequence('build-sass', 'move-to-docs', browserSync.reload);
    });

    // watch module files
    gulp.watch(config.src.modulesPath + '/**/*.html', function () {
      runSequence('html-lint', 'build-js', 'move-to-docs', browserSync.reload);
    });

    // -- watch doc files -- //

    // watch less
    gulp.watch(config.docs.assetsPath + '/**/*.scss', function () {
      runSequence('create-demo-css', browserSync.reload);
    });

    // html files
    gulp.watch(config.docs.path + '/**/*.html', browserSync.reload);

    // watch js files
    gulp.watch(config.docs.path + '/**/*.js', function () {
      runSequence('build-demo', browserSync.reload);
    });
  });
};

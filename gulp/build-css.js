'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log){
  gulp.task('build-css', ['create-main-less']);

  gulp.task('copy-less', function () {
    // Copy bootstrap less files
    gulp.src(config.src.bootstrapWrapperPath + '/**')
      .pipe(gulp.dest(config.dev.lessPath));

    //Copy modules files
    return gulp.src(config.src.modulesPath + '/**/*.less')
      .pipe($.flatten())
      .pipe(gulp.dest(config.dev.lessModulesPath));
  });

  gulp.task('create-main-less', ['copy-less'], function () {
    return gulp.src([config.dev.lessPath + '*.less', config.dev.lessModulesPath + '/*.less'])
      .pipe($.lessImport('ngGovUk.less'))
      .pipe(gulp.dest(config.dev.path));
  });
}

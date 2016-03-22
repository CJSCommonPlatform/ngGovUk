'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log) {
  gulp.task('move-to-docs', ['copy-fonts-to-docs', 'copy-images-to-docs'], function () {
    return gulp.src([config.dev.path + '/**/*'], {
      base: config.dev.path
    })
      .pipe(gulp.dest(config.docs.bowerComponentsPath + '/' + config.dist.name));
  });
  gulp.task('copy-fonts-to-docs', function () {
    return gulp.src([config.dev.fontsPath + '/**/*'])
      .pipe(gulp.dest(config.docs.fontsPath));
  });
  gulp.task('copy-images-to-docs', function () {
    return gulp.src([config.dev.imgPath + '/**/*'])
      .pipe(gulp.dest(config.docs.imgPath));
  });
};

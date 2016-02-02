'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log) {
  gulp.task('create-dist', function () {
    return gulp.src(config.dev.path + '/**')
      .pipe(gulp.dest(config.dist.path));
  });

  gulp.task('uglify-dist', function () {
    return gulp.src(config.dist.path + '/*.js')
      .pipe($.uglify())
      .pipe($.rename({extname: '.min.js'}))
      .pipe(gulp.dest(config.dist.path));
  });
};

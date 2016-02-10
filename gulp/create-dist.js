'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log) {
  gulp.task('create-dist', ['copy-dev'], function () {
    return gulp.src([config.dist.lessPath + '/*.less', config.dist.lessModulesPath + '/*.less'])
      .pipe($.lessImport(config.dist.name + '.less'))
      .pipe(gulp.dest(config.dist.path));
  });

  gulp.task('copy-dev', function () {
    return gulp.src([config.dev.path + '/**', !config.dev.path + config.dist.name + '.less'])
      .pipe(gulp.dest(config.dist.path));
  });

  gulp.task('uglify-dist', function () {
    return gulp.src(config.dist.path + '/*.js')
      .pipe($.uglify())
      .pipe($.rename({extname: '.min.js'}))
      .pipe(gulp.dest(config.dist.path));
  });
};

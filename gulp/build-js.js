'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log) {
  gulp.task('build-js', function () {
    return gulp.src(config.src.modulesPath + '/*/*.js')
      .pipe($.concat(config.dist.name + '.js'))
      .pipe(gulp.dest(config.dev.path));
  });
};

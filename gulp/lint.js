'use strict';

var gulp    = require('gulp');
var $       = require('gulp-load-plugins')({ lazy: true });
//var stylish = require('jshint-stylish');

module.exports = function(config, log){
  gulp.task('lint', function() {
    log('Analysing source with ESLint');

    gulp.src(config.src.modulesPath + '/**/*.js')
      .pipe($.eslint()) // defaults to local linting config
      .pipe($.eslint.format())
      //.pipe(browserSync.reload({ stream: true }));
  });
};

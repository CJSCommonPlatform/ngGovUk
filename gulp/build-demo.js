'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

// create standalone build
module.exports = function (config, log) {
  gulp.task('build-demo', function () {
    return gulp.src(config.docs.appPath + '/**/*.js')
      .pipe($.angularFilesort())
      .pipe($.concat('app.js'))
      .pipe(gulp.dest(config.docs.path));
  });
};

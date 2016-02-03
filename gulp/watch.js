
'use strict';

var gulp      = require('gulp');
var runSequence = require('run-sequence');

// watch files for changes and invokes respective tasks
module.exports = function (config, log) {
  gulp.task('watch', function () {
    gulp.watch(config.src.modulesPath + '/**/*.js', function () {
      runSequence('build-js');
    });
  });
};

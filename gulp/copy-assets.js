'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log){
  gulp.task('copy-assets', function () {
    // Copy all asset files
    return gulp.src(config.src.assetPath + '/**')
      .pipe(gulp.dest(config.dev.assetPath));
  });
}

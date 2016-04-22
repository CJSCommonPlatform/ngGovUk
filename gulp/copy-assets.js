'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {
  gulp.task('copy-images', ['copy-asset-images', 'copy-stylesheet-images']);
  gulp.task('copy-asset-images', function () {
    // Copy all asset files
    return gulp.src(config.nodeModules.govUkTemplateAssetImagePath + '/**')
      .pipe(gulp.dest(config.dev.imagePath));
  });
  gulp.task('copy-stylesheet-images', function () {
    // Copy all asset files
    return gulp.src(config.nodeModules.govUkTemplateStylesheetImagePath + '/**')
      .pipe(gulp.dest(config.dev.imagePath));
  });
};

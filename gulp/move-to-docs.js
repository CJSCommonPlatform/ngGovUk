'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {
  gulp.task('move-to-docs', ['move-dev-assets-to-docs'], function () {
    return gulp.src([config.dev.path + '/**/*'], {
      base: config.dev.path
    })
      .pipe(gulp.dest(config.docs.bowerComponentsPath + '/' + config.dist.name));
  });

  gulp.task('move-dev-assets-to-docs', function () {
    return gulp.src([config.dev.assetPath + '/**/*'], {
      base: config.dev.assetPath
    })
      .pipe(gulp.dest(config.docs.assetsPath));
  });
};

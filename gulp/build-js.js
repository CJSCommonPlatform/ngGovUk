'use strict';

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log) {
  gulp.task('build-js', ['build-partials'], function () {
    return gulp.src([
      config.src.modulesPath + '/' + config.src.modulesFile,
      config.src.modulesPath + '/*/*.js',
      config.dev.templateCachePath + '/**/*.js'
    ])
      .pipe($.concat(config.dist.name + '.js'))
      .pipe(gulp.dest(config.dev.path));
  });

  gulp.task('build-partials', function () {
    return gulp.src(config.src.modulesPath + '/*/*.html')
      .pipe($.ngHtml2js({moduleName: config.dist.name}))
      .pipe($.concat(config.dev.templateName))
      .pipe(gulp.dest(config.dev.templateCachePath));
  });
};

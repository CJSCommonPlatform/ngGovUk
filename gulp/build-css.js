'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({ lazy: true });
var source = require('vinyl-source-stream');
var path   = require('path');
var lessImportString = require('./helpers/lessImportString')();

module.exports = function(config, log) {
  gulp.task('build-css', ['create-css']);

  gulp.task('create-demo-css', function () {
    return gulp.src(config.docs.lessPath + '/app.less')
      .pipe($.less())
      .pipe(gulp.dest(config.docs.cssPath));
  });

  gulp.task('create-css', ['create-main-less'], function () {
    return gulp.src(config.dev.path + '/*.less')
      .pipe($.less())
      .pipe(gulp.dest(config.dev.path));
  });

  gulp.task('create-main-less', ['copy-less'], function () {
    var stream = source(config.dist.name + '.less');

    gulp.src([config.docs.bowerBootstrapLessPath + '/bootstrap.less', config.dev.lessPath + '/*.less', config.dev.lessModulesPath + '/*.less'])
      .pipe($.tap(function (file, t) {
        var filePath;

        if (path.basename(file.path) === 'bootstrap.less') {
          filePath = path.dirname(file.path);
        } else {
          filePath = 'less' + path.dirname(file.path).split('less')[1];
        }

        stream.write(lessImportString(filePath, path.basename(file.path)));
      }));

    stream.pipe(gulp.dest(config.dev.path));
  });

  gulp.task('copy-less', ['copy-less-theme', 'copy-less-modules']);

  gulp.task('copy-less-theme', function () {
    return gulp.src(config.src.bootstrapWrapperPath + '/**')
      .pipe(gulp.dest(config.dev.lessPath));
  });

  gulp.task('copy-less-modules', function () {
    //Copy modules files
    return gulp.src(config.src.modulesPath + '/**/*.less')
      .pipe($.flatten())
      .pipe(gulp.dest(config.dev.lessModulesPath));
  });
};

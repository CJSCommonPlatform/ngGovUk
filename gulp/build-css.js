'use strict';

var gulp   = require('gulp');
var sass   = require('gulp-sass');
var rename = require('gulp-rename');
var $      = require('gulp-load-plugins')({ lazy: true });
var source = require('vinyl-source-stream');
var path   = require('path');
var lessImportString = require('./helpers/lessImportString')();

module.exports = function(config) {

  gulp.task('build-css', ['create-css']);

  gulp.task('build-sass', function() {
    return gulp.src('./src/index.scss')
      .pipe(sass({
        includePaths: [
          path.resolve(process.cwd(), 'node_modules/govuk_frontend_toolkit/stylesheets'),
          path.resolve(process.cwd(), 'node_modules/govuk-elements-sass/public/sass')
        ],
        importer: function importer(url) {
          if (url[0] === '~') {
            url = path.resolve(process.cwd(), 'node_modules', url.substr(1));
          }
          return {file: url};
        }
      }))
      .on('error', function swallowError (error) {
        console.log(error.toString());
        this.emit('end');
      })
      .pipe(rename({basename: 'app'}))
      .pipe(gulp.dest('./dev/assets/css'));
  });

  gulp.task('create-demo-css', function () {
    return gulp.src(config.docs.lessPath + '/app.less')
      .pipe($.less())
      .pipe(gulp.dest(config.docs.cssPath));
  });

  gulp.task('copy-less', ['copy-less-theme', 'copy-less-modules']);

  gulp.task('copy-less-theme', function () {
    return gulp.src(config.src.bootstrapWrapperPath + '/**')
      .pipe(gulp.dest(config.dev.lessPath));
  });

  gulp.task('copy-sass', function () {
    //Copy modules files
    return gulp.src(['./src/**/*.scss', '!./src/styles/docs/**/*.scss'])
//      .pipe($.flatten())
      .pipe(gulp.dest('./dist'));
  });
};

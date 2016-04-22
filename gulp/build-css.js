'use strict';

var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({ lazy: true });
var source = require('vinyl-source-stream');

module.exports = function (config, log) {

  gulp.task('build-css', ['create-css']);

  gulp.task('create-css', ['copy-sass-resources-to-dev'], function () {
    return gulp.src(config.dev.sassPath + '/*.scss')
      .pipe($.sass())
      .pipe(gulp.dest(config.dev.assetPath));
  });

  gulp.task('copy-sass-resources-to-dev', ['copy-nggov-sass-to-dev', 'copy-external-dependencies-to-dev']);

  gulp.task('copy-nggov-sass-to-dev', [
    'copy-dev-sass-main-file',
    'copy-dev-sass-bootstrap-theme',
    'copy-dev-sass-modules',
    'copy-dev-sass-govuk-overrides']);

  gulp.task('copy-dev-sass-main-file', function () {
    return gulp.src(config.src.sassPath + '/*.scss')
      .pipe(gulp.dest(config.dev.sassPath));
  });

  gulp.task('copy-dev-sass-govuk-overrides', function () {
    return gulp.src(config.src.govUkOverridesPath + '/**/*.scss')
      .pipe(gulp.dest(config.dev.govUkOverridesPath));
  });

  gulp.task('copy-dev-sass-bootstrap-theme', function () {
    return gulp.src(config.src.bootstrapThemePath + '/**/*.scss')
      .pipe(gulp.dest(config.dev.sassBootstrapThemePath));
  });

  gulp.task('copy-dev-sass-modules', function () {
    return gulp.src(config.src.modulesPath + '/**/*.scss')
      .pipe($.flatten())
      .pipe(gulp.dest(config.dev.sassModulesPath));
  });

  gulp.task('copy-external-dependencies-to-dev',
    ['copy-core-bootstrap',
      'copy-core-bootstrap',
      'copy-govuk-elements',
      'copy-govuk-template',
      'copy-govuk-frontend-toolkit']);

  gulp.task('copy-core-bootstrap', function () {
    return gulp.src(config.nodeModules.bootstrapPath + '/**')
      .pipe(gulp.dest(config.dev.sassBootstrapPath));
  });

  gulp.task('copy-govuk-frontend-toolkit', function () {
    return gulp.src(config.nodeModules.govUkToolkitSassPath + '/**')
      .pipe(gulp.dest(config.dev.sassGovUkToolkitPath));
  });

  gulp.task('copy-govuk-elements', function () {
    return gulp.src(config.nodeModules.govUkElementsSassPath + '/**')
      .pipe(gulp.dest(config.dev.sassGovUkElementsPath));
  });

  gulp.task('copy-govuk-template', function () {
    return gulp.src(config.nodeModules.govUkTemplateStylePath + '/**')
      .pipe(gulp.dest(config.dev.sassGovUkTemplatePath));
  });

};

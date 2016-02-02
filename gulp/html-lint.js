'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

module.exports = function(config, log) {
  gulp.task('html-lint', function () {
    var options = {
      tmplext: 'tpl.html',
      customtags: [],
      customattrs: [],
      relaxerror: [
        "Start tag seen without seeing a doctype first. Expected e.g. “<!DOCTYPE html>”.",
        "Element “head” is missing a required instance of child element “title”.",
        "Bad value “{{item.ref}}” for attribute “href” on element “a”: Illegal character in path segment: “{” is not allowed.",
        "Bad value “{{subNavItem.ref}}” for attribute “href” on element “a”: Illegal character in path segment: “{” is not allowed.",
        "Bad value “{{navItem.href}}” for attribute “href” on element “a”: Illegal character in path segment: “{” is not allowed."
      ],
      reportCheckstylePath: 'reports/html-angular-validate-report-checkstyle.xml',
      reportpath: 'reports/html-angular-validate-report.json',
      emitError: true,
      reportFn:function(fileFailures){
        for (var i = 0; i < fileFailures.length; i++) {
          var fileResult = fileFailures[i];
          $.util.log(fileResult.filepath);
          for (var j = 0; j < fileResult.errors.length; j++) {
            var err = fileResult.errors[j];
            if (err.line !== undefined) {
              $.util.log('[line' +err.line +', col: ' + err.col +'] ' +err.msg);
            } else {
              $.util.log(err.msg);
            }
          }
        }
      }
    };

    gulp.src([
      config.src.modulesPath + '/**/*.html',
      config.docs.path + '/*.html'
    ])
      .pipe($.arialinter({
        level: 'AA'
      }))
      .pipe($.htmlAngularValidate(options));
  });
};
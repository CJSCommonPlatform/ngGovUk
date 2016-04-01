(function () {
  'use strict';

  var wiredep = require('wiredep');

  module.exports = function () {
    var config = {
      // paths
      src: {
        path: './src',
        bootstrapWrapperPath: './src/bootstrap-wrapper',
        modulesPath: './src/modules',
        assetPath: './src/assets',
        modulesFile: 'modules.js'
      },
      dev: {
        path: './dev',
        lessPath: './dev/less',
        lessModulesPath: './dev/less/modules',
        assetPath: './dev/assets',
        fontsPath: './dev/assets/fonts',
        imgPath: './dev/assets/img',
        templateCachePath: './dev/templates',
        templateName: 'templates.js'
      },
      docs: {
        path: './docs',
        appPath: './docs/app',
        appControllerPath: './docs/app/controller',
        assetsPath: './docs/assets',
        fontsPath: './docs/assets/fonts',
        imgPath: './docs/assets/img',
        lessPath: './docs/assets/less',
        cssPath: './docs/assets/css',
        bowerComponentsPath: './docs/bower_components',
        bowerBootstrapLessPath: './docs/bower_components/bootstrap/less',
      },
      dist: {
        path: './dist',
        lessPath: './dist/less',
        fontsPath: './dist/assets/fonts',
        imgPath: './dist/assets/img',
        cssPath: './dist/assets/css',
        lessModulesPath: './dist/less/modules',
        name: 'ngGovUk'
      },
      karmaConf: __dirname + '/karma.conf.js',
      karmaPlugins: ['karma-jasmine', 'karma-coverage', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-sinon', 'karma-junit-reporter', 'karma-ng-html2js-preprocessor'],
      karmaBowerDependencies: getKarmaBowerDependencies(),
      appFilesToTest: [
        'src/**/*.js'
      ]
    };

    config.karma = getKarmaOptions();

    function getKarmaBowerDependencies() {
      return wiredep({
        devDependencies: true
      })['js'];

    }

    function getKarmaOptions() {
      var options = {
        files: [].concat(
          config.karmaBowerDependencies, // karma dependencies i.e. angular mocks
          config.appFilesToTest, // app modules and files to test
          {pattern: 'src/app/**/*.html', watched: true, served: true, included: true}
        ),
        coverage: {
          dir: config.tests_report_dir,
          reporters: [ // types of reporters to use
            {type: 'html', subdir: 'report-html'}, // report in browser
            {type: 'lcov', subdir: 'report-lcov'}, // for jenkin reading
            {type: 'text-summary'} // output to the console
          ]
        },
        preprocessors: {
          'src/**/!(test)/*.js': ['coverage'],
          'src/app/**/*!(index).html': 'ng-html2js'
        },
        ngHtml2JsPreprocessor: {
          stripPrefix: 'src/',
          moduleName: 'templates'
        }
      };

      return options;
    }

    return config;
  }
})();

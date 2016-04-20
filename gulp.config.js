(function () {
  'use strict';

  var wiredep = require('wiredep');

  module.exports = function () {
    var config = {
      // paths
      src: {
        path: './src',
        sassPath: './src/sass',
        sassCustomPath: './src/sass/custom',
        bootstrapThemePath: './src/sass/bootstrap-theme',
        modulesPath: './src/modules',
        assetPath: './src/assets',
        modulesFile: 'modules.js'
      },
      dev: {
        path: './dev',
        sassPath: './dev/sass',
        sassBootstrapThemePath: './dev/sass/ng-gov-uk/bootstrap-theme',
        sassCustomPath: './dev/sass/ng-gov-uk/custom',
        sassModulesPath: './dev/sass/ng-gov-uk/modules',
        sassBootstrapPath: './dev/sass/bootstrap',
        sassGovUkElementsPath: './dev/sass/gov-uk-elements',
        sassGovUkToolkitPath: './dev/sass/gov-uk-toolkit',
        sassGovUkTemplatePath: './dev/sass/gov-uk-template',
        assetPath: './dev/assets',
        fontsPath: './dev/assets/fonts',
        imgPath: './dev/assets/img',
        cssPath: './dev/assets/css',
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
        sassPath: './docs/assets/sass',
        cssPath: './docs/assets/css',
        cssName: 'app.css',
        bowerComponentsPath: './docs/bower_components'
      },
      nodeModules: {
        bootstrapPath: './node_modules/bootstrap-sass/assets/stylesheets',
        govUkToolkitPath: './node_modules/govuk_frontend_toolkit/stylesheets',
        govUkElementsPath: './node_modules/govuk-elements-sass/public/sass',
        govUkTemplatePath: './node_modules/govuk_template_ejs/assets/stylesheets'
      },
      dist: {
        path: './dist',
        sassPath: './dist/sass',
        fontsPath: './dist/assets/fonts',
        imgPath: './dist/assets/img',
        cssPath: './dist/assets/css',
        sassModulesPath: './dist/sass/modules',
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
          {pattern: 'src/modules/**/*.html', watched: true, served: true, included: true}
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
          'src/modules/**/*.html': 'ng-html2js'
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

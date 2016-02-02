(function () {

  'use strict';

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
        templateCachePath: './dev/templates',
        templateName: 'templates.js'
      },
      docs: {
        path: './docs',
        bowerComponentsPath: './docs/assets/bower_components',
        bowerBootstrapLessPath: './docs/assets/bower_components/bootstrap/less',
      },
      dist: {
        path: './dist',
        name: 'ngGovUk'
      }
    };

    return config;
  };
})();

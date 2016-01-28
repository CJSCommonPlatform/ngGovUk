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
        templateCachePath: './dev/templates'
      },
      docs: {
        path: './docs',
        bowerComponentsPath: './docs/assets/bower_components',
      },
      dist: {
        name: 'ngGovUk'
      }
    };

    return config;
  };
})();
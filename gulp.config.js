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
        cssName: 'app.css',
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
      }
    };

    return config;
  };
})();

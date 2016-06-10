(function () {
  'use strict';

  angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    var viewsPath = 'app/views/';

    $locationProvider.hashPrefix('!');

    $stateProvider
        .state('playground', {
          url:'/playground',
          templateUrl: viewsPath + 'playground.html'
        })
        .state('modules', {
          url:'/modules',
          templateUrl: viewsPath + 'modules.html'
        })
        .state('css', {
          url:'/css',
          templateUrl: viewsPath + 'css.html',
          controller: 'css',
          controllerAs: 'vm'
        })
        .state('components', {
          url:'/components',
          templateUrl: viewsPath + 'components.html',
          controller: 'components'
        })
        .state('getting-started', {
          url: '/',
          templateUrl: viewsPath + 'getting-started.html'
        });

      $urlRouterProvider.otherwise('/');
  });
})();

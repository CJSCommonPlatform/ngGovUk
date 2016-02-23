(function () {
  angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, hljsServiceProvider) {

    $locationProvider.hashPrefix('!');
    $stateProvider
        .state('playground', {
          url:'/playground',
          templateUrl:'playground.html',
          controller: 'playground'
        })
        .state('modules', {
          url:'/modules',
          templateUrl:'modules.html'
        })
        .state('css', {
          url:'/css',
          templateUrl:'css.html',
          controller: 'CssController'
        })
        .state('angularui', {
          url:'/angularui',
          templateUrl:'angularui.html',
          controller: 'angularui'
        })
        .state('getting-started', {
          url: '/',
          templateUrl:'getting-started.html'
        });
      $urlRouterProvider.otherwise('/');
  });
})();

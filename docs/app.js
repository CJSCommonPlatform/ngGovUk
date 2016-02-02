angular.module('app', [
  'ngAnimate',
  'ui.router',
  'angularSmoothscroll',
  'ngGovUk',
  'ui.bootstrap',
  'hljs',
  'angular.vertilize',
  'smoothScroll'
]);
angular.module('app')
.config(function($stateProvider, $urlRouterProvider, $locationProvider, hljsServiceProvider){

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
})
.run(function ($rootScope) {
    // set the body class
    var globalNav;

    $rootScope.breaks = 'fluid';

    globalNav = {
      pageTitle: {
        title: 'ngGovUk',
        type: 'text',
        ref: '#'
      },
      navItems: [
        {
          title: 'Getting Started',
          type: 'href',
          ref: '#!/'
        },
        {
          title: 'CSS Elements',
          type: 'href',
          ref: '#!/css'
        },
        {
          title: 'UI Components',
          type: 'href',
          ref: '#!/angularui'
        },
        {
          title: 'Ng Modules',
          type: 'href',
          ref: '#!/modules'
        },
        {
          title: 'Playground',
          type: 'href',
          ref: '#!/playground'
        }
      ]
    };

    $rootScope.globalNav = globalNav;
});
angular.module('app').controller('footerDemoCtrl', function ($scope) {

});
angular.module('app').controller('globalNavDemoCtrl', function ($scope) {
  $scope.globalNav = {
    pageTitle: {
      title: 'Criminal Justice System',
      type: 'text',
      ref: '#'
    },
    navItems: [
      {
        title: 'Getting Started',
        type: 'href',
        ref: '#!/modules'
      },
      {
        title: 'CSS Elements',
        type: 'href',
        ref: '#!/modules'
      },
      {
        title: 'UI Components',
        type: 'href',
        ref: '#!/modules'
      },
      {
        title: 'Ng Modules',
        type: 'href',
        ref: '#!/modules'
      },
      {
        title: 'API',
        type: 'href',
        ref: '#!/modules'
      }
    ]
  };
});
angular.module('app').controller('navSideDemoCtrl', function ($scope) {
  var items;

  items = [
    {
      title: 'Single Link',
      type: 'ui-sref',
      ref: '#'
    },
    {
      title: 'Example Accordion Title 1',
      href: null,
      children: [
        {
          title: 'Example 1',
          type: 'ui-sref',
          ref: '#',
          detail: 'Incomplete'
        },
        {
          title: 'Example 2',
          type: 'ui-sref',
          ref: '#'
        },
        {
          title: 'Example 3',
          type: 'ui-sref',
          ref: '#'
        }
      ]
    },
    {
      title: 'Example Accordion Title 2',
      href: null,
      children: [
        {
          title: 'Example 1',
          type: 'scroll-to',
          ref: 'scroll-to-id'
        },
        {
          title: 'Example 2',
          type: 'href',
          ref: '#'
        }
      ]
    }
  ];

  $scope.navItems = items;

});
angular.module('app').controller('tabbedMenuDemoCtrl', function ($scope) {
  $scope.tabbedItems = {
    title: 'View:',
    items: [
      {
        title: 'Cases added today',
        ref: ''
      },
      {
        title: 'All cases',
        ref: ''
      }
    ]
  };

});

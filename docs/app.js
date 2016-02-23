(function () {
  'use strict';

  angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ngGovUk',
    'ui.bootstrap',
    'hljs',
    'angular.vertilize',
    'smoothScroll',
    'ngSanitize'
  ]);
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('tabbedMenuDemo', Controller);

  function Controller($scope) {

    activate();
    ////////////////

    function activate() {
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
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('navSideDemo', Controller);

  function Controller($scope) {

    activate();
    ////////////////

    function activate() {
      $scope.navItems = [
        {
          title: 'Single Link',
          type: 'ui-sref',
          ref: '#',
          detail: 'Incomplete'
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
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('globalNavDemo', Controller);

  function Controller($scope) {
    activate();

    ////////////////

    function activate() {
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
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('footerDemo', Controller);

  function Controller(dependencies) {
    activate();
    ////////////////

    function activate() {

    }
  }
})();

angular.module('app').controller('stubs', function ($scope) {


});

angular.module('app')
.controller('ScrollToAnchorController', ['$scope','$location','$anchorScroll', function($scope, $location, $anchorScroll) {
   $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }
}]);
angular.module('app').controller('angularui', function ($scope, $modal, $log) {
  // Nav
  var navItems;
  navItems = [
    {
      title: 'Search',
      type: 'scroll-to',
      ref: 'search'
    },
    {
      title: 'Accordion',
      type: 'scroll-to',
      ref: 'accordion'
    },
    {
      title: 'Alerts',
      children: [
        {
          title: 'Attention Alert',
          type: 'scroll-to',
          ref: 'attention-alert'
        },
        {
          title: 'Success Alert',
          type: 'scroll-to',
          ref: 'success-alert'
        }
      ]
    },
    {
      title: 'Notifications',
      children: [
        {
          title: 'Success Notification',
          type: 'scroll-to',
          ref: 'success-notification'
        },
        {
          title: 'Invalid Notification',
          type: 'scroll-to',
          ref: 'invalid-notification'
        }
      ]
    }
  ];


  // Accordian
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
  $scope.navItems = navItems;

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };


  // Alerts
  $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  // Buttons

  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModel = {
    left: false,
    middle: true,
    right: false
  };

  // Caroucel

  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
      ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }

  // collapse

  $scope.isCollapsed = false;

  // Date picker

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };



  // Dropdown

  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };


  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };


  // Pagination

  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;

  // Pop over

  $scope.dynamicPopover = {
    content: 'Hello, World!',
    templateUrl: 'myPopoverTemplate.html',
    title: 'Title'
  };

});

angular.module('app').controller('CssController', function ($scope, $modal, $log) {
  var defendants,
      navItems;

  defendants = [
    {
      caseNumber: '11SJ/12345/12',
      name: 'Charles Forstman',
      nextCourtDate: '22/07/2016',
      collapsed: true,
      content: 'here is some content about Charles Forstman'
    },
    {
      caseNumber: '11SJ/12345/13',
      name: 'Logan Sanders',
      nextCourtDate: '12/12/2015',
      collapsed: true,
      content: 'here is some content about Logan Sanders'
    },
    {
      caseNumber: '11SJ/12345/18',
      name: 'Ava Hessington',
      nextCourtDate: '13/09/2018',
      collapsed: true,
      content: 'here is some content about Ava Hessington'
    }
  ];

  navItems = [
    {
      title: 'Typography',
      children: [
        {
          title: 'Font',
          type: 'scroll-to',
          ref: 'font'
        },
        {
          title: 'Lead paragraph',
          type: 'scroll-to',
          ref: 'lead-paragraph'
        },
        {
          title: 'Body copy',
          type: 'scroll-to',
          ref: 'body-copy'
        },
        {
          title: 'Links',
          type: 'scroll-to',
          ref: 'links'
        },
        {
          title: 'Lists',
          type: 'scroll-to',
          ref: 'lists'
        },
        {
          title: 'Inset text',
          type: 'scroll-to',
          ref: 'inset-text'
        },
        {
          title: 'Hidden text (progressive disclosure)',
          type: 'scroll-to',
          ref: 'hidden-text'
        }
      ]
    },
    {
      title: 'Data',
      children: [
        {
          title: 'Numeric tabular data',
          type: 'scroll-to',
          ref: 'numeric-tabular'
        },
        {
          title: 'Data in a table',
          type: 'scroll-to',
          ref: 'numeric-data'
        },
        {
          title: 'Hover rows',
          type: 'scroll-to',
          ref: 'hover-rows'
        },
        {
          title: 'Collapsible table',
          type: 'scroll-to',
          ref: 'collapsible-table'
        },
        {
          title: 'Data visualisation',
          type: 'scroll-to',
          ref: 'data-visualisation'
        }
      ]
    },
    {
      title: 'Buttons',
      children: [
        {
          title: 'Button Text',
          type: 'scroll-to',
          ref: 'button-text'
        },
        {
          title: 'Start Now Button',
          type: 'scroll-to',
          ref: 'start-now-button'
        },
        ,
        {
          title: 'Review Complete',
          type: 'scroll-to',
          ref: 'review-complete'
        },
        {
          title: 'Button Alignment',
          type: 'scroll-to',
          ref: 'button-alignment'
        },
        {
          title: 'Disabled Buttons',
          type: 'scroll-to',
          ref: 'disabled-buttons'
        },
        {
          title: 'Arrow Buttons',
          type: 'scroll-to',
          ref: 'arrow-buttons'
        }
      ]
    },
    {
      title: 'Alpha Beta Banners',
      children: [
        {
          title: 'Alpha Banner',
          type: 'scroll-to',
          ref: 'alpha-banner'
        },
        {
          title: 'Beta Banner',
          type: 'scroll-to',
          ref: 'beta-banner'
        }
      ]
    },
    {
      title: 'Form Elements',
      href: null,
      children: [
        {
          title: 'Labels',
          type: 'scroll-to',
          ref: 'labels'
        },
        {
          title: 'Form Focus States',
          type: 'scroll-to',
          ref: 'form-focus-states'
        },
        {
          title: 'Hint Text',
          type: 'scroll-to',
          ref: 'hint-text'
        },
        {
          title: 'Form Spacing',
          type: 'scroll-to',
          ref: 'form-spacing'
        },
        {
          title: 'Form Fieldsets',
          type: 'scroll-to',
          ref: 'form-fieldsets'
        },
        {
          title: 'Form Select Boxes',
          type: 'scroll-to',
          ref: 'form-select-boxes'
        },
        {
          title: 'Form Inline Radio Buttons',
          type: 'scroll-to',
          ref: 'inline-radio-buttons'
        },
        {
          title: 'Form Stacked Radio Buttons',
          type: 'scroll-to',
          ref: 'stacked-radio-buttons'
        },
        {
          title: 'Form Stacked Checkboxes',
          type: 'scroll-to',
          ref: 'stacked-checkboxes'
        },
        {
          title: 'Form Inline Checkboxes',
          type: 'scroll-to',
          ref: 'inline-checkboxes'
        },
        {
          title: 'Radio Conditionally Reveal Content',
          type: 'scroll-to',
          ref: 'radio-conditionally-reveal-content'
        },
        {
          title: 'Checkbox Conditionally Reveal Content',
          type: 'scroll-to',
          ref: 'checkbox-conditionally-reveal-content'
        },
        {
          title: 'Form Checkbox Toggle Content',
         type: 'scroll-to',
          ref: 'toggle-content-checkboxes'
        }
      ],
    },
     {
      title: 'Errors and Validation',
      href: null,
      children: [
        {
          title: 'Error message and summary box',
          type: 'scroll-to',
          ref: 'error-message-and-summary-box'
        },
        {
          title: 'Highlight errors in forms',
          type: 'scroll-to',
          ref: 'highlight-errors-in-forms'
        },
      ]
    }
  ];

  function sort ($event) {
    var target,
        ascSortClass;

    ascSortClass = 'sort-active-asc';

    target = angular.element($event.target);

    target.toggleClass(ascSortClass);
  }

  $scope.defendants = defendants;
  $scope.navItems = navItems;
  $scope.sort = sort;
})
.controller('FormSubmitController', ['$scope', function($scope) {

  $scope.submitted = false;

  $scope.submitForm = function() {
    $scope.submitted = true;
  }
}]);

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

(function () {
  'use strict';

  angular.module('app')
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
})();

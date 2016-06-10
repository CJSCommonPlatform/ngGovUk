(function () {
  'use strict';

  angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ngGovUk',
    'ui.bootstrap',
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
    .controller('progressListDemo', Controller);

  function Controller($scope) {

    activate();
    ////////////////

    function activate() {
      $scope.progressListDemo = [
        {
          title: 'Welcome',
          active: false,  // for applying active css class
          access: true, // for displaying complete/incomplete messages
          complete: true // for  displaying complete/incomplete corresponding  message
        },
        {
          title: 'One-time passcode',
          active: true,
          access: true,
          complete: false
        },
        {
          title: 'Create password',
          active:false,
          access: false,
          complete:false
        },
        {
          title: 'Complete registration',
          active:false,
          access: false,
          complete: false
        }
      ];
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
    .controller('lazyValidationDemo', LazyValidationDemo);

    function LazyValidationDemo($scope) {
        $scope.submitForm = function () {
            alert('Submit form: This gets called only when form is valid');
        };

        $scope.checkValidationManually = function () {
            // Check additional criteria before submitting the form
            if ($scope.form.$valid) {
                $scope.submitForm();
            }
        };
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
      $scope.demoNav = {
        pageTitle: {
          title: 'Demo Title',
          type: 'text',
          ref: '#'
        },
        navItems: [
          {
            title: 'Nav Item 1',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: 'Nav Item 2',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: 'Nav Item 3',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: 'Nav Item 4',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: ' Nav Item 5',
            type: 'href',
            ref: '#!/modules'
          }
        ],
        displaySettings:{
          showUnderline: true
        }
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

(function() {
  'use strict';

  angular
    .module('app')
    .controller('formSubmit', Controller);

  function Controller($scope) {

    activate();
    ////////////////

    function submitForm() {
      $scope.submitted = true;
    }

    function activate() {
      $scope.submitted = false;
      $scope.submitForm = submitForm;
    }
  }
})();
angular.module('app').directive('syntaxHighlighter', function () {
  return {
    restrict: 'A',
    scope: {
      source: '@', //interpolation not supported in the initial version
      language: '@'
    },
    template: function (element, attrs) {
      return '<pre><code class="language-' + (attrs.language || 'markup') + '"></code></pre>';
    },
    link: function (scope, element, attrs) {
      scope.languageClass = 'language-markup';
      function _getIndentation(string) {
        var match = string.match(/^ +/);
        return match ? match[0].length : 0;
      }
      //formatting html attribute to avoid angular to bypass angular's trimming
      var formattedSource = _.chain(element.attr('data-source') || element.attr('source'))
        .split('\n')
        .compact()
        .thru(function (lines) {
          var firstLineIndentation = _getIndentation(lines[0]);
          var currentLineIndentation;
          return _.map(lines, function (line) {
            currentLineIndentation = _getIndentation(line);
            //if current line indented less than the first, trim all indentation
            if (currentLineIndentation < firstLineIndentation) {
              return line.replace(/^ +/, '');
            }
            //otherwise, normalise indentation based on the first line
            return line.replace(new RegExp('^ {' + firstLineIndentation + '}'), '');
          });
        })
        .join('\n')
        .escape()
        .value();
      element.ready(function () {
        element.find('code').html(formattedSource);
        Prism.highlightElement(element.find('code')[0]);
      });
    }
  };
});

(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScrollToAnchorController', Controller);

  function Controller($scope, $location, $anchorScroll) {
    var vm = this;

    vm.scrollTo = scrollTo;

    ////////////////
    function scrollTo(id) {
      $location.hash(id);
      $anchorScroll();
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('css', Controller);

  function Controller() {
    var defendants,
        navItems;

    var vm = this;

    activate()

    vm.defendants = defendants;
    vm.navItems = navItems;
    vm.sort = sort;
    ////////////////

    function sort($event) {
      var target,
        ascSortClass;

      ascSortClass = 'sort-active-asc';

      target = angular.element($event.target);

      target.toggleClass(ascSortClass);
    }

    function activate() {
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
            },
            {
              title: 'Digit numbers confirmantion box',
              type: 'scroll-to',
              ref: 'digit-box'
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
              title: 'Danger Button',
              type: 'scroll-to',
              ref: 'danger-button'
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
            },
            {
              title: 'Input boxes & link alignement',
              type: 'scroll-to',
              ref: 'input-link-alignement'
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
            }
          ]
        }
      ];
    }
  }
})();

angular.module('app').controller('components', function ($scope, $modal, $log) {
  // Nav
  var navItems;
  navItems = [
    {
      title: 'Breadcrumbs',
      type: 'scroll-to',
      ref: 'breadcrumbs'
    },
    {
      title: 'Stripe',
      type: 'scroll-to',
      ref: 'stripe'
    },
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
      title: 'Progress List',
      type: 'scroll-to',
      ref: 'progress-list'
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
        },
        {
          title: 'Active Notification',
          type: 'scroll-to',
          ref: 'active-notification'
        },
        {
          title: 'Deregistered Notification',
          type: 'scroll-to',
          ref: 'deregistered-notification'
        },
        {
          title: 'Pending Notification',
          type: 'scroll-to',
          ref: 'pending-notification'
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
            ref: '#!/components'
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
          },
        ],
        displaySettings:{
          showUnderline: true
        }
      };

      $rootScope.globalNav = globalNav;
  });
})();

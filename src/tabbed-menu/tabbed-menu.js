'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ngGovUk.tabbed-menu', []);

// tabbedMenu Service Template
angular.module('ngGovUk.tabbed-menu').factory('tabbedMenuService', function() {

  var tabbedMenu = { };

  return tabbedMenu;

});

// tabbedMenu Filter Template
angular.module('ngGovUk.tabbed-menu').filter('tabbedMenuFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// tabbedMenu Directive Template
angular.module('ngGovUk.tabbed-menu').directive('tabbedMenu', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      tabbedItems: '='
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // replace: true,
    // transclude: true,
    templateUrl: 'tabbed-menu/tabbed-menu.html',
    link: function (scope, element, attrs, fn) {

    }
  };
});



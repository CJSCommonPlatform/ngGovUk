'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ngGovUk.global-nav', []);

// globalNav Service Template
angular.module('ngGovUk.global-nav').factory('globalNavService', function() {

  var globalNav = {
    isCollapsed: true
  };

  return globalNav;

});

// globalNav Filter Template
angular.module('ngGovUk.global-nav').filter('globalNavFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// globalNav Directive Template
angular.module('ngGovUk.global-nav').directive('globalNav', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    replace: true,
    transclude: true,
    templateUrl: 'global-nav/global-nav.html',
    link: function (scope, element, attrs, fn) {

    }
  };
});



'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ui.cpp.footer', []);

// footer Service Template
angular.module('ui.cpp.footer').factory('footerService', function() {

  var footer = { };

  return footer;

});

// footer Filter Template
angular.module('ui.cpp.footer').filter('footerFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// footer Directive Template
angular.module('ui.cpp.footer').directive('footerDirective', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // replace: true,
    // transclude: true,
    templateUrl: 'footer/footer.html',
    link: function (scope, element, attrs, fn) {

    }
  };
});



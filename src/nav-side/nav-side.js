'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ui.cpp.nav-side', []);

// navSide Service Template
angular.module('ui.cpp.nav-side').factory('navSideService', function() {

  var navSide = { };

  return navSide;

});

// navSide Filter Template
angular.module('ui.cpp.nav-side').filter('navSideFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// navSide Directive Template
angular.module('ui.cpp.nav-side').directive('navSideDirective', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      collapseTitle: '=',
      navigationItems: '=',
      currentState: '='
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
     restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // replace: true,
    // transclude: true,
    templateUrl: 'nav-side/nav-side.html',
    link: function (scope) {
      scope.isCollapsed = false;

      scope.isOpen = function(item){
        var result

        result = false;
        if (item && item.children && scope.currentState && scope.currentState.name){
          for(var i = 0; i<item.children.length; i++){
            if (item.children[i].ref.indexOf(scope.currentState.name) !== -1){
              result = true;
              break;
            }
          }
        }
        return result;
      };

      window.onload = updateCollapsedStatus;
      window.onresize = updateCollapsedStatus;

      function updateCollapsedStatus () {
        var windowWidth = window.innerWidth;

        if (windowWidth < 768) {
          scope.isCollapsed = true;
        } else {
          scope.isCollapsed = false;
        }
        scope.$apply();
      }
    }
  };
});



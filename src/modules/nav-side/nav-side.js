(function () {
  'use strict';

  angular
    .module('ngGovUk.nav-side', [])
    .directive('navSideDirective', navSideDirective);

  function navSideDirective () {
    var directive = {
      link: link,
      templateUrl: 'nav-side/nav-side.html',
      restrict: 'EA',
      scope: {
        collapseTitle: '=',
        navigationItems: '=',
        currentState: '='
      }
    };

    return directive;

    function link (scope, element, attrs, fn) {
      scope.isCollapsed = false;

      scope.isOpen = function(item) {
        var result = false;

        if (item && item.children && scope.currentState && scope.currentState.name) {
          for (var i = 0; i < item.children.length; i++) {
            if (item.children[i].ref.indexOf(scope.currentState.name) !== -1){
              result = true;
              break;
            }
          }
        }

        return result;
      };

      window.onload = updateCollapsedStatus(scope);
      window.onresize = updateCollapsedStatus(scope);
    }

    function updateCollapsedStatus (scope) {
      var windowWidth = window.innerWidth;

      if (windowWidth < 768) {
        scope.isCollapsed = true;
      } else {
        scope.isCollapsed = false;
      }
      scope.$apply();
    }
  };
})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.global-nav', [])
    .directive('globalNav', globalNav);

  function globalNav () {
    var directive = {
      link: link,
      templateUrl: 'global-nav/global-nav.html',
      restrict: 'EA'
    };

    return directive;

    function link (scope, element, attrs, fn) {
      scope.globalNav.isCollapsed = true;
    }
  };
})();

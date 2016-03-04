(function () {
  'use strict';

  angular
    .module('ngGovUk.tabbed-menu', [])
    .directive('tabbedMenu', tabbedMenu);

  function tabbedMenu() {
    var directive = {
      link: link,
      templateUrl: 'tabbed-menu/tabbed-menu.html',
      restrict: 'EA',
      scope: {
        title: '=',
        tabbedItems: '='
      }
    };

    return directive;

    function link(scope, element, attrs, fn) {
    }
  }
})();


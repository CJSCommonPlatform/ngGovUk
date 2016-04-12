(function () {
  'use strict';

  angular
    .module('ngGovUk.tabbed-menu', [])
    .directive('tabbedMenu', tabbedMenu);

  function tabbedMenu() {
    var directive = {
      link: link,
      templateUrl: 'modules/tabbed-menu/tabbed-menu.tpl.html',
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


(function () {
  'use strict';

  angular
    .module('ngGovUk.global-nav', [])
    .directive('globalNav', globalNav);

  function globalNav() {
    var directive = {
      link: link,
      templateUrl: 'global-nav/global-nav.html',
      restrict: 'EA',
      replace: true,
      scope: {
        navSettings: '='
      }
    };

    return directive;

    function link(scope, element, attrs, fn) {

      if(scope.navSettings) {
        scope.globalNav = scope.navSettings;
      } else {
        scope.globalNav = {
          pageTitle: {
            title: 'Test Global Nav',
            type: 'text',
            ref: '#'
          },
          navItems: [
            {
              title: 'Getting Started',
              type: 'href',
              ref: '#!/'
            }
          ],
          displaySettings: {
            showUnderline: true
          }
        };
      }

    }
  }
})();

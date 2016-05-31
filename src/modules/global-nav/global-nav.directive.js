(function () {
  'use strict';

  angular
    .module('ngGovUk.global-nav', [])
    .directive('globalNav', globalNav)
    .directive('metaId', function () {
      return {
        compile: function (tElem, tAttrs) {
          // this is a fix for the fact GDS elements require an id for styling
          // and we may need to declare more than one id in the template as part
          // of ng-if declaration - this in turn breaks the linter
          tElem.attr('id', tAttrs.metaId);
        }
      };
    });

  function globalNav() {
    var directive = {
      link: link,
      templateUrl: 'modules/global-nav/global-nav.tpl.html',
      restrict: 'EA',
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

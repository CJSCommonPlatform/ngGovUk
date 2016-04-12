(function () {
  'use strict';

  angular
    .module('ngGovUk.footer', [])
    .directive('footerDirective', footerDirective);

  function footerDirective() {
    var directive = {
      link: link,
      templateUrl: 'modules/footer/footer.tpl.html',
      restrict: 'EA'
    };

    return directive;

    function link(scope, element, attrs, fn) {

    }
  }
})();

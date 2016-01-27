(function() {
  'use strict';

  angular
    .module('ngGovUk.footer')
    .directive('footerDirective', footerDirective);


  function footerDirective () {
    var directive = {
      link: link,
      templateUrl: 'footer/footer.html',
      restrict: 'EA'
    };

    return directive;

    function link(scope, element, attrs, fn) {

    }
  };
})();


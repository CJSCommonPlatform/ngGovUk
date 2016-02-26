(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScrollToAnchorController', Controller);

  function Controller($scope, $location, $anchorScroll) {
    var vm = this;

    vm.scrollTo = scrollTo;

    ////////////////
    function scrollTo(id) {
      $location.hash(id);
      $anchorScroll();
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('tabbedMenuDemo', Controller);

  function Controller($scope) {

    activate();
    ////////////////

    function activate() {
      $scope.tabbedItems = {
        title: 'View:',
        items: [
          {
            title: 'Cases added today',
            ref: ''
          },
          {
            title: 'All cases',
            ref: ''
          }
        ]
      };
    }
  }
})();

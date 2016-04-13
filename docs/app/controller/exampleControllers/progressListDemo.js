(function() {
  'use strict';

  angular
    .module('app')
    .controller('progressListDemo', Controller);

  function Controller($scope) {

    activate();
    ////////////////

    function activate() {
      $scope.progressListDemo = [
        {
          title: 'Welcome',
          active: false,  // for applying active css class
          state: true, // for displaying complete/incomplete messages
          complete: true // for  displaying complete/incomplete corresponding  message
        },
        {
          title: 'One-time passcode',
          active: true,
          state: true,
          complete: false
        },
        {
          title: 'Create password',
          active:false,
          state: false,
          complete:false
        },
        {
          title: 'Complete registration',
          active:false,
          state: false,
          complete: false
        }
      ];
    }
  }
})();

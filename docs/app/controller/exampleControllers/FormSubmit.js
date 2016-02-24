(function() {
  'use strict';

  angular
    .module('app')
    .controller('formSubmit', Controller);

  function Controller($scope) {

    activate();
    ////////////////

    function submitForm() {
      $scope.submitted = true;
    }

    function activate() {
      $scope.submitted = false;
      $scope.submitForm = submitForm;
    }
  }
})();
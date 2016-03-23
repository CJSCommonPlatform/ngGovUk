(function() {
  'use strict';

  angular
    .module('app')
    .controller('lazyValidationDemo', LazyValidationDemo);

    function LazyValidationDemo($scope) {
        $scope.submitForm = function () {
            alert('Submit form: This gets called only when form is valid');
        };

        $scope.checkValidationManually = function () {
            // Check additional criteria before submitting the form
            if ($scope.form.$valid) {
                $scope.submitForm();
            }
        };
    }
})();

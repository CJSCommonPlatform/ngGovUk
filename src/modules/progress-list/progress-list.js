(function () {
  'use strict';

  angular
    .module('ngGovUk.progress-list', [])
    .directive('progressListDirective', progressListDirective);

  function progressListDirective() {
    var directive = {
      link: link,
      templateUrl: 'progress-list/progress-list.html',
      restrict: 'EA',
      scope: {
        progressListItems: '=',
        currentState: '='
      }
    };

    return directive;

    function link(scope, element, attrs, fn) {
      if(!scope.progressListItems) {
        $scope.progressListItems = [
          {
            title: 'Item 1',
            active: false,  // for applying active css class
            state: true, // for displaying complete/incomplete messages
            complete: true // for  displaying complete/incomplete corresponding  message
          },
          {
            title: 'Item 2',
            active: true,
            state: true,
            complete: false
          },
          {
            title: 'Item 3',
            active:false,
            state: false,
            complete:false
          },
          {
            title: 'Item 4',
            active:false,
            state: false,
            complete: false
          }
        ];
      }
    }
  }
})();

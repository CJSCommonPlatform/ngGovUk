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
      replace: true,
      scope: {
        progressListItems: '=',
        currentState: '='
      }
    };

    return directive;

    function link(scope, element, attrs, fn) {
      if(!scope.progressListItems) {

        scope.progressListItems = [
          {
            title: 'Item 1',
            active: false,  // for applying active css class
            access: true, // for displaying complete/incomplete messages
            complete: true // for  displaying complete/incomplete corresponding  message
          },
          {
            title: 'Item 2',
            active: true,
            access: true,
            complete: false
          },
          {
            title: 'Item 3',
            active:false,
            access: false,
            complete:false
          },
          {
            title: 'Item 4',
            active:false,
            access: false,
            complete: false
          }
        ];
      }
    }
  }
})();

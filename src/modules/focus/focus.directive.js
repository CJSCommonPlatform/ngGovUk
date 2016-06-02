(function () {
  'use strict';

  /**
  * @desc This directive will allow to focus on the specific input when validation error links are displayed
  *      at the top of a form. It should be used together with data-ng-scroll="id" so it will scroll to the
  *      right input on the page and set the focus to the field.
  * @example <a href="#" data-event-focus="click" data-scroll-to="contact-list">
  */

  angular
    .module('ngGovUk.focus', [])
    .directive('eventFocus', ['$timeout', '$window', eventFocus]);

  function eventFocus($timeout, $window){
    return {
      restrict: 'A',
      link: function (scope, elem, attr) {
        elem.on(attr.eventFocus, function () {
          var id = attr.scrollTo;
          // timeout makes sure that it is invoked after any other event has been triggered like clicks
          $timeout(function () {
            var element = $window.document.getElementById(id);
            if (element) {
              element.focus();
            }
          });
        });

      // Removes bound events in the element itself when the scope is destroyed
        scope.$on('$destroy', function () {
          elem.off(attr.eventFocus);
        });
      }
    };
  }
})();

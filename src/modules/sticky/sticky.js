(function () {
  'use strict';

  angular
    .module('ngGovUk.sticky', [])
    /**
     * Sticky directive
     *
     * @author: Vygintas Ranonis
     * @description: Makes the element sticky, positioning at the top of the page when the viewport scrolls down.
     * 'Bottoming out' can be enabled on a specified element - upon reaching its position, the element will be fixed
     * to its bottom. Responsive container width is supported (the element will be restyled on window resize), which is
     * useful when the using the directive inside the responsive Boostrap grid.
     * @param stickyBottomSelector: jQuery selector of the 'bottom out' element - when the sticky element
     * reaches the position of this element, it sticks to its top, rather than the top of the page.
     * @param stickyMinimumWidth: miminum page width at which to trigger stickiness (useful when
     * sticky behaviour is not needed in small viewports
     *
     * (example usage: wrap the nav-side directive in a sticky container, bottoming out with the footer element, and disabled
     * for small viewports)
     * <div data-sticky data-sticky-bottom-selector="footer" data-sticky-minimum-width="768">
     *    <div data-nav-side-directive data-navigation-items="navItems"></div>
     * </div>
     *
     * NOTE1: there are currently no unit tests as it is not feasable to test window scrolling behaviour with Karma
     * NOTE2: while there are several existing sticky libraries out there, none of them provide all of the desired
     * behaviour
     */

    .directive('sticky', function ($document) {

      function getElementDimensions(element) {
        return {
          width: element.width(),
          top: element.offset().top
        };
      }

      function fixElement(element, dimensions, bottomElementHeight) {
        var topCorrection = 0;
        if (bottomElementHeight) {
          var heightDifference = (Math.floor($document.height() - $document.scrollTop() - bottomElementHeight) -
          element.outerHeight());
          topCorrection = heightDifference < 0 ? heightDifference : 0;
        }
        element.attr({style: 'top:0;position:fixed;' +
        'width:' + dimensions.width + 'px;'
        + 'top:' + topCorrection + 'px'});
      }

      function unfixElement(element){
        element.attr({style: ''});
      }

      function elementShouldBeFixed(dimensions) {
        return $document.scrollTop() >= dimensions.top;
      }

      return {
        restrict: 'A',
        scope: {
          stickyBottomSelector: '=',
          stickyMinimumWidth: '='
        },
        link: function link(scope, element, attrs) {
          var stickyMinWidth = parseInt(attrs.stickyMinimumWidth) || 0;
          var stickyBottomElement = $(attrs.stickyBottomSelector);
          var bottomHeight = stickyBottomElement.length ? stickyBottomElement.outerHeight() : 0;
          var elementDimensions = getElementDimensions(element);
          $(window).on('scroll', _.debounce(function () {
            if ($document.width() >= stickyMinWidth) {
              elementShouldBeFixed(elementDimensions) ?
                fixElement(element, elementDimensions, bottomHeight) :
                unfixElement(element);
            }
          }, 10));
          $(window).on('resize', _.debounce(function () {
            unfixElement(element);
            elementDimensions = getElementDimensions(element);
            bottomHeight = stickyBottomElement.length ? stickyBottomElement.outerHeight() : 0;
            if (elementShouldBeFixed(elementDimensions) && $document.width() >= stickyMinWidth) {
              fixElement(element, elementDimensions, bottomHeight);
            }
          }, 10));
        }
      };
    });
})();

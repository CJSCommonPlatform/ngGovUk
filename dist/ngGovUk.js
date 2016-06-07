(function () {
  'use strict';

  angular.module('ngGovUk', [
    'ngGovUk.footer',
    'ngGovUk.global-nav',
    'ngGovUk.nav-side',
    'ngGovUk.tabbed-menu',
    'ngGovUk.form-validation',
    'ngGovUk.progress-list',
    'ngGovUk.sticky'
  ]);
})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.form-validation', [
      'ngGovUk.form-validation.lazy-validation',
      'ngGovUk.form-validation.lazy-validation-on-click'
    ]);
})();
(function () {
  'use strict';

  angular
      .module('ngGovUk.form-validation.lazy-validation-on-click', [
        'ngGovUk.form-validation.lazy-validation'
      ])
      .directive('lazyValidationOnClick', lazyValidationOnClick);

  /**
   * This directive triggers revalidation of a form on a click event
   *
   * <form lazy-validation="scopePropertyToBindFormValidation">
   *     <button lazy-validation-on-click="optionalCallbackWhenFormValid()" />
   * </form>
   */
  function lazyValidationOnClick() {
    return {
      restrict: 'A',
      require: '^^lazyValidation',
      /** Makes sure postLink runs before ng-click */
      priority: '-1',
      link: function ($scope, element, attrs, lazyValidationController) {
        var revalidateAndRunCallbackIfDefined = function () {
          lazyValidationController.revalidate();

          if (lazyValidationController.isValid() && $scope.ifValidCallback) {
            $scope.ifValidCallback();
          }
        };

        element.bind('click', function () {
          $scope.$apply(revalidateAndRunCallbackIfDefined);
        });
      },
      scope: {
        ifValidCallback: '&?lazyValidationOnClick'
      }
    };
  }
})();
(function () {
  'use strict';

  angular
    .module('ngGovUk.form-validation.lazy-validation', [])
    .directive('lazyValidation', lazyValidation);

  /**
   * Lazy Validation
   *
   * It wraps default angular validation which is dynamic in it's nature
   * and delays its execution till it's explicitly required
   * (eg. when user clicks on a form's 'Submit' button)
   *
   * <form lazy-validation="formName">
   *   <span ng-if="formName.name.$error.required">Name is required</span>
   *   <input type=text name="name">
   *
   *   <button lazy-validation-on-click></button>
   * </form>
   */
  function lazyValidation() {
    function createDeepCopy(validationData) {
      return angular.copy(validationData);
    }

    return {
      restrict: 'A',
      require: 'form',
      controller: ['$scope', function ($scope) {
        this.revalidate = function () {
          $scope.validation = createDeepCopy($scope.angularFormController);
        };

        this.isValid = function () {
          return $scope.angularFormController.$valid;
        };
      }],
      link: function ($scope, element, attrs, angularFormController) {
        $scope.angularFormController = angularFormController;
      },
      scope: {
        validation: '=lazyValidation'
      }
    };
  }
})();
(function () {
  'use strict';

  angular
    .module('ngGovUk.footer.footer-directive', [])
    .directive('footerDirective', footerDirective);

  /* @ngInject */
  function footerDirective($sce) {
    var directive = {
      link: link,
      templateUrl: 'modules/footer/footer.tpl.html',
      restrict: 'EA',
      scope: {
        settings: '=?footerSettings'
      }
    };

    return directive;

    function link(scope, element, attrs) {
      var defaultSettings = {
        links: [
          { title: 'All GOV.UK blogs', ref: 'https://www.blog.gov.uk', type: 'href' },
          { title: 'All GOV.UK blog posts', ref: 'https://www.blog.gov.uk/all-posts/', type: 'href' },
          { title: 'GOV.UK', ref: 'https://www.gov.uk', type: 'href' },
          { title: 'All departments', ref: 'https://www.gov.uk/government/organisations', type: 'href' },
          { title: 'All topics', ref: 'https://www.gov.uk/government/topics', type: 'href' },
          { title: 'All policies', ref: 'https://www.gov.uk/government/policies', type: 'href' },
          { title: 'Cookies', ref: 'https://www.blog.gov.uk/cookies', type: 'href' }
        ],

        copyright: {
          link: 'https://www.nationalarchives.gov.uk/information-management/our-services/crown-copyright.htm',
          text: 'Crown copyright'
        },

        licence: {
          link: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/',
          text: 'All content is available under the \
                 <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license"> \
                  Open Government Licence v3.0 \
                 </a>, \
                 except where otherwise stated'
        }
      };

      var mergedSettings = angular.extend(defaultSettings, scope.settings);

      if (mergedSettings.licence && mergedSettings.licence.text) {
        mergedSettings.licence.text = $sce.trustAsHtml(mergedSettings.licence.text.toString());
      }

      scope.settings = mergedSettings;
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.footer', [
      'ngGovUk.footer.footer-directive'
    ]);

})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.global-nav', [])
    .directive('globalNav', globalNav)
    .directive('metaId', function () {
      return {
        compile: function (tElem, tAttrs) {
          // this is a fix for the fact GDS elements require an id for styling
          // and we may need to declare more than one id in the template as part
          // of ng-if declaration - this in turn breaks the linter
          tElem.attr('id', tAttrs.metaId);
        }
      };
    });

  function globalNav() {
    var directive = {
      link: link,
      templateUrl: 'modules/global-nav/global-nav.tpl.html',
      restrict: 'EA',
      scope: {
        navSettings: '='
      }
    };

    return directive;

    function link(scope, element, attrs, fn) {

      if(scope.navSettings) {
        scope.globalNav = scope.navSettings;
      } else {
        scope.globalNav = {
          pageTitle: {
            title: 'Test Global Nav',
            type: 'text',
            ref: '#'
          },
          navItems: [
            {
              title: 'Getting Started',
              type: 'href',
              ref: '#!/'
            }
          ],
          displaySettings: {
            showUnderline: true
          }
        };
      }

    }
  }
})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.nav-side', [])
    .directive('navSideDirective', navSideDirective);

  function navSideDirective() {
    var directive = {
      link: link,
      templateUrl: 'modules/nav-side/nav-side.tpl.html',
      restrict: 'EA',
      scope: {
        collapseTitle: '=',
        navigationItems: '=',
        currentState: '='
      }
    };

    return directive;

    function link(scope, element, attrs, fn) {
      scope.isCollapsed = false;

      scope.isOpen = function (item) {
        var result = false;

        if (item && item.children && scope.currentState && scope.currentState.name) {
          for (var i = 0; i < item.children.length; i++) {
            if (item.children[i].ref.indexOf(scope.currentState.name) !== -1){
              result = true;
              break;
            }
          }
        }

        return result;
      };

      window.onload = updateCollapsedStatus(scope);
      window.onresize = updateCollapsedStatus(scope);
    }

    function updateCollapsedStatus(scope) {
      var windowWidth = window.innerWidth;

      if (windowWidth < 768) {
        scope.isCollapsed = true;
      } else {
        scope.isCollapsed = false;
      }
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.progress-list', [])
    .directive('progressListDirective', progressListDirective);

  function progressListDirective() {
    var directive = {
      link: link,
      templateUrl: 'modules/progress-list/progress-list.tpl.html',
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

      function fixElement(element, dimensions, bottomElementHeight, viewportHeight) {
        var topCorrection = 0;
        if (bottomElementHeight) {
          var heightDifference = (Math.floor($document.height() - $document.scrollTop() - bottomElementHeight) -
          element.outerHeight());
          topCorrection = heightDifference < 0 ? heightDifference : 0;
        }
        element.css({
          position: 'fixed',
          width: dimensions.width,
          top: topCorrection,
          overflow: 'scroll',
          maxHeight: viewportHeight
        });
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
          var viewportHeight = window.innerHeight;
          var elementDimensions = getElementDimensions(element);
          $(window).on('scroll', _.debounce(function () {
            if ($document.width() >= stickyMinWidth) {
              elementShouldBeFixed(elementDimensions) ?
                fixElement(element, elementDimensions, bottomHeight, viewportHeight) :
                unfixElement(element);
            }
          }, 10));
          $(window).on('resize', _.debounce(function () {
            unfixElement(element);
            elementDimensions = getElementDimensions(element);
            viewportHeight = window.innerHeight;
            bottomHeight = stickyBottomElement.length ? stickyBottomElement.outerHeight() : 0;
            if (elementShouldBeFixed(elementDimensions) && $document.width() >= stickyMinWidth) {
              fixElement(element, elementDimensions, bottomHeight, viewportHeight);
            }
          }, 10));
        }
      };
    });
})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.tabbed-menu', [])
    .directive('tabbedMenu', tabbedMenu);

  function tabbedMenu() {
    var directive = {
      link: link,
      templateUrl: 'modules/tabbed-menu/tabbed-menu.tpl.html',
      restrict: 'EA',
      scope: {
        title: '=',
        tabbedItems: '='
      }
    };

    return directive;

    function link(scope, element, attrs, fn) {
    }
  }
})();


(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/footer/footer.tpl.html',
    '<footer class="group js-footer" id="footer" role="contentinfo">\n' +
    '\n' +
    '  <div class="footer-wrapper">\n' +
    '\n' +
    '    <div class="footer-meta">\n' +
    '      <div class="footer-meta-inner">\n' +
    '        <ul>\n' +
    '          <li data-ng-repeat="link in settings.links">\n' +
    '            <a data-ng-if="link.type === \'href\'" data-ng-href="{{ link.ref }}">{{ link.title }}</a>\n' +
    '            <a data-ng-if="link.type === \'ui-sref\'" data-ui-sref="{{ link.ref }}">{{ link.title }}</a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '\n' +
    '        <div class="open-government-licence">\n' +
    '          <p class="logo">\n' +
    '            <a data-ng-href="{{ settings.licence.link }}"></a>\n' +
    '          </p>\n' +
    '          <p class="licence-text" data-ng-bind-html="settings.licence.text"></p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="copyright">\n' +
    '        <a class="crown-copy" data-ng-href="{{ settings.copyright.link }}">&copy; {{ settings.copyright.text }}</a>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</footer>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/global-nav/global-nav.tpl.html',
    '<header role="banner" id="global-header" class="with-proposition">\n' +
    '\n' +
    '  <div class="header-wrapper">\n' +
    '\n' +
    '    <div class="header-global">\n' +
    '      <div class="header-logo">\n' +
    '        <a id="logo" href="#!/" class="content">\n' +
    '          <img width="35" height="31" alt="" src="assets/img/gov.uk_logotype_crown_invert_trans.png"/> GOV.UK\n' +
    '        </a>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="header-proposition">\n' +
    '      <a href="#proposition-links" class="js-header-toggle menu">Menu</a>\n' +
    '      <nav id="proposition-menu">\n' +
    '\n' +
    '        <a meta-id="proposition-name" data-ng-if="globalNav.pageTitle.type === \'href\'" href="#">\n' +
    '          {{globalNav.pageTitle.title}}\n' +
    '        </a>\n' +
    '        <a meta-id="proposition-name" data-ng-if="globalNav.pageTitle.type === \'ui-sref\'" data-ui-sref="#">\n' +
    '          {{globalNav.pageTitle.title}}\n' +
    '        </a>\n' +
    '        <span meta-id="proposition-name" data-ng-if="globalNav.pageTitle.type === \'text\'">\n' +
    '          {{globalNav.pageTitle.title}}\n' +
    '        </span>\n' +
    '\n' +
    '        <ul id="proposition-links">\n' +
    '          <li data-ng-repeat="item in globalNav.navItems">\n' +
    '            <a data-ng-if="item.type === \'href\'" href="{{item.ref}}">{{item.title}}</a>\n' +
    '            <a data-ng-if="item.type === \'ui-sref\'" data-ui-sref="{{item.ref}}">{{item.title}}</a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '      </nav>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</header>\n' +
    '\n' +
    '<div id="global-header-bar" ng-if="globalNav.displaySettings.showUnderline"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/nav-side/nav-side.tpl.html',
    '<aside class="nav-side">\n' +
    '  <nav>\n' +
    '    <ul class="accordion">\n' +
    '      <li data-accordion data-ng-repeat="navItem in navigationItems">\n' +
    '        <ul data-accordion-group data-heading="{{navItem.title}}" data-ng-class="{\'active\':isOpen(navItem)}" data-is-open="{{ isOpen(navItem) }}" data-ui-sref-active="active" data-ng-if="navItem.children" class="nav-item nav-item-with-children">\n' +
    '          <li data-ng-repeat="subNavItem in navItem.children">\n' +
    '\n' +
    '            <!-- If Permissions -->\n' +
    '            <a data-ng-if="subNavItem.type === \'scroll-to\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" data-scroll-to="{{subNavItem.ref}}" href="#" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '              <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '              <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '            </a>\n' +
    '            <!-- If no permissions -->\n' +
    '            <a data-ng-if="subNavItem.type === \'scroll-to\'" data-ng-hide="subNavItem.permissions" data-scroll-to="{{subNavItem.ref}}" href="#" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '              <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '              <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '            </a>\n' +
    '\n' +
    '            <!-- If Permissions -->\n' +
    '            <a data-ng-if="subNavItem.type === \'ui-sref\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" data-ui-sref="{{subNavItem.ref}}" data-ui-sref-active="active" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '              <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '              <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '            </a>\n' +
    '            <!-- If no permissions -->\n' +
    '            <a data-ng-if="subNavItem.type === \'ui-sref\'" data-ng-hide="subNavItem.permissions" ui-sref="{{subNavItem.ref}}" data-ui-sref-active="active" data-data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '              <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '              <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '            </a>\n' +
    '\n' +
    '            <!-- If Permissions -->\n' +
    '            <a data-ng-if="subNavItem.type === \'href\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" href="{{subNavItem.ref}}" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '              <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '              <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '            </a>\n' +
    '            <!-- If no permissions -->\n' +
    '            <a data-ng-if="subNavItem.type === \'href\'" data-ng-hide="subNavItem.permissions" href="{{subNavItem.ref}}" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '              <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '              <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '        <div class="panel-heading nav-item" data-ng-if="!navItem.children">\n' +
    '          <!-- If Permissions -->\n' +
    '          <h4 data-ng-show="navItem.permissions" class="panel-title" data-only-access data-permissions="{{navItem.permissions}}">\n' +
    '            <a data-ng-if="navItem.type === \'scroll-to\'" data-scroll-to="{{navItem.ref}}" href="#" data-offset="20">{{navItem.title}}</a>\n' +
    '            <a data-ng-if="navItem.type === \'ui-sref\'" ui-sref="{{navItem.ref}}" data-offset="20" ui-sref-active="active">{{navItem.title}}</a>\n' +
    '            <a data-ng-if="navItem.type === \'href\'" href="{{navItem.href}}" data-offset="20">{{navItem.title}}</a>\n' +
    '          </h4>\n' +
    '          <!-- If no permissions -->\n' +
    '          <h4 data-ng-hide="navItem.permissions" class="panel-title">\n' +
    '            <a data-ng-if="navItem.type === \'scroll-to\'" data-scroll-to="{{navItem.ref}}" href="#" data-offset="20">\n' +
    '              {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '              <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '            </a>\n' +
    '            <a data-ng-if="navItem.type === \'ui-sref\'" ui-sref="{{navItem.ref}}" data-offset="20" ui-sref-active="active" data-ng-class="{\'parent-with-detail\' : !!navItem.detail}">\n' +
    '              {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '              <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '            </a>\n' +
    '            <a data-ng-if="navItem.type === \'href\'" href="{{navItem.href}}" data-offset="20">\n' +
    '              {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '              <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '            </a>\n' +
    '          </h4>\n' +
    '        </div>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </nav>\n' +
    '</aside>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/progress-list/progress-list.tpl.html',
    '<ul class="progress-list list-group">\n' +
    '    <li data-ng-repeat="item in progressListItems" ng-class="item.active ? \'list-group-item active\' : \'list-group-item\'">\n' +
    '        <h4>{{$index + 1}}. {{item.title}}</h4>\n' +
    '              <span ng-if="item.access && item.complete">\n' +
    '                <span class="glyphicon glyphicon-ok success-color"></span>Complete\n' +
    '              </span>\n' +
    '        <span ng-if="item.access && !item.complete">Incomplete</span>\n' +
    '    </li>\n' +
    '</ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/tabbed-menu/tabbed-menu.tpl.html',
    '<div class="tabbedMenu">\n' +
    '  <nav>\n' +
    '    <ul class="nav nav-tabs">\n' +
    '      <li class="nav-title" data-ng-if="title" data-ng-bind="title"></li>\n' +
    '      <li data-ng-repeat="item in tabbedItems">\n' +
    '        <a ui-sref="item.ref" data-ng-bind="item.title"></a>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </nav>\n' +
    '</div>\n' +
    '');
}]);
})();

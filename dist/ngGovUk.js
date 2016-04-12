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
    .module('ngGovUk.footer', [])
    .directive('footerDirective', footerDirective);

  function footerDirective() {
    var directive = {
      link: link,
      templateUrl: 'modules/footer/footer.tpl.html',
      restrict: 'EA'
    };

    return directive;

    function link(scope, element, attrs, fn) {

    }
  }
})();

(function () {
  'use strict';

  angular
    .module('ngGovUk.global-nav', [])
    .directive('globalNav', globalNav);

  function globalNav() {
    var directive = {
      link: link,
      templateUrl: 'modules/global-nav/global-nav.tpl.html',
      restrict: 'EA',
      replace: true,
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
    '<footer id="footer" class="cpp-footer">\n' +
    '  <div class="container">\n' +
    '    <div class="row">\n' +
    '      <div class="col-md-10">\n' +
    '        <div class="footer-meta-inner">\n' +
    '          <nav>\n' +
    '            <ul id="menu-footer" class="menu list-inline">\n' +
    '              <li class="menu-all-government-blogs"><a href="https://www.blog.gov.uk">All GOV.UK blogs</a></li>\n' +
    '              <li class="menu-all-government-blog-posts"><a href="https://www.blog.gov.uk/all-posts/">All GOV.UK blog posts</a></li>\n' +
    '              <li class="menu-gov-uk"><a href="https://www.gov.uk">GOV.UK</a></li>\n' +
    '              <li class="menu-all-departments"><a href="https://www.gov.uk/government/organisations">All departments</a></li>\n' +
    '              <li class="menu-all-topics"><a href="https://www.gov.uk/government/topics">All topics</a></li>\n' +
    '              <li class="menu-all-policies"><a href="https://www.gov.uk/government/policies">All policies</a></li>\n' +
    '              <li class="menu-cookies"><a href="https://www.blog.gov.uk/cookies">Cookies</a></li>\n' +
    '            </ul>\n' +
    '          </nav>\n' +
    '          <div class="open-government-licence">\n' +
    '            <p class="logo">\n' +
    '              <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Service</a>\n' +
    '            </p>\n' +
    '            <p>All content is available under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated</p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="col-md-2 text-center">\n' +
    '        <div class="footer-logo">\n' +
    '          <a class="crown-copy" href="https://www.nationalarchives.gov.uk/information-management/our-services/crown-copyright.htm">&copy; Crown copyright</a>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</footer>\n' +
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
  $templateCache.put('modules/global-nav/global-nav.tpl.html',
    '<div>\n' +
    '    <header class="navbar navbar-default">\n' +
    '        <div class="navbar-content">\n' +
    '            <div class="navbar-inner">\n' +
    '                <div class="container">\n' +
    '                    <div class="row">\n' +
    '                        <div class="navbar-header col-md-4">\n' +
    '                            <div class="header-logo clearfix">\n' +
    '                                <a href="#!/" role="button" class="navbar-brand text-uppercase">\n' +
    '                                    <img width="35" height="31" alt="" src="assets/img/gov.uk_logotype_crown_invert_trans.png" /> GOV.UK\n' +
    '                                </a>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-8">\n' +
    '                            <h3 class="navbar-title" data-ng-if="globalNav.pageTitle">\n' +
    '                                <a data-ng-if="globalNav.pageTitle.type === \'href\'" href="#">{{globalNav.pageTitle.title}}</a>\n' +
    '                                <a data-ng-if="globalNav.pageTitle.type === \'ui-sref\'" data-ui-sref="#">{{globalNav.pageTitle.title}}</a>\n' +
    '                                <span data-ng-if="globalNav.pageTitle.type === \'text\'">{{globalNav.pageTitle.title}}</span>\n' +
    '                            </h3>\n' +
    '                            <button data-ng-if="globalNav.navItems" type="button" class="navbar-toggle" data-toggle="collapse"\n' +
    '                                    data-ng-click="globalNav.isCollapsed = !globalNav.isCollapsed"\n' +
    '                                    data-ng-class="{\'nav-open\': globalNav.isCollapsed}">\n' +
    '                                <span class="sr-only">Toggle navigation</span>\n' +
    '                                Menu\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="row" data-ng-if="globalNav.navItems">\n' +
    '                        <nav class="navbar-right col-md-8 col-md-offset-4">\n' +
    '                            <ul class="nav navbar-nav proposition-links" id="props" data-collapse="!globalNav.isCollapsed">\n' +
    '                                <li data-ng-repeat="item in globalNav.navItems">\n' +
    '                                    <a data-ng-if="item.type === \'href\'" href="{{item.ref}}">{{item.title}}</a>\n' +
    '                                    <a data-ng-if="item.type === \'ui-sref\'" data-ui-sref="{{item.ref}}">{{item.title}}</a>\n' +
    '                                </li>\n' +
    '                            </ul>\n' +
    '                        </nav>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </header>\n' +
    '    <div data-ng-if="globalNav.displaySettings.showUnderline" class="container">\n' +
    '        <div ng-class="{\'global-header-bar\':globalNav.displaySettings.showUnderline}" ></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
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
  $templateCache.put('modules/nav-side/nav-side.tpl.html',
    '<div class="nav-side">\n' +
    '  <nav>\n' +
    '    <div class="navbar-header">\n' +
    '      <button type="button"\n' +
    '              class="navbar-toggle side-nav-toggle"\n' +
    '              data-toggle="isCollapsed = !isCollapsed"\n' +
    '              data-ng-click="isCollapsed = !isCollapsed"\n' +
    '              data-ng-class="{\'nav-open\': isCollapsed}">\n' +
    '        <span class="sr-only">Toggle navigation</span>\n' +
    '        <span class="icon-bar-title" data-ng-bind="collapseTitle"></span>\n' +
    '        <span class="icon-bars">\n' +
    '          <span class="icon-bar"></span>\n' +
    '          <span class="icon-bar"></span>\n' +
    '          <span class="icon-bar"></span>\n' +
    '        </span>\n' +
    '      </button>\n' +
    '    </div>\n' +
    '    <div class="navbar-collapse" data-collapse="isCollapsed">\n' +
    '      <ul class="accordion">\n' +
    '        <li data-accordion data-ng-repeat="navItem in navigationItems">\n' +
    '          <ul data-accordion-group data-heading="{{navItem.title}}" data-ng-class="{\'active\':isOpen(navItem)}" data-is-open="{{ isOpen(navItem) }}" data-ui-sref-active="active" data-ng-if="navItem.children" class="nav-item nav-item-with-children">\n' +
    '            <li data-ng-repeat="subNavItem in navItem.children">\n' +
    '\n' +
    '              <!-- If Permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'scroll-to\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" data-scroll-to="{{subNavItem.ref}}" href="#" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '              <!-- If no permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'scroll-to\'" data-ng-hide="subNavItem.permissions" data-scroll-to="{{subNavItem.ref}}" href="#" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '\n' +
    '\n' +
    '\n' +
    '              <!-- If Permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'ui-sref\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" data-ui-sref="{{subNavItem.ref}}" data-ui-sref-active="active" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '              <!-- If no permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'ui-sref\'" data-ng-hide="subNavItem.permissions" ui-sref="{{subNavItem.ref}}" data-ui-sref-active="active" data-data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '\n' +
    '\n' +
    '\n' +
    '              <!-- If Permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'href\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" href="{{subNavItem.ref}}" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '              <!-- If no permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'href\'" data-ng-hide="subNavItem.permissions" href="{{subNavItem.ref}}" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '            </li>\n' +
    '          </ul>\n' +
    '          <div class="panel-heading nav-item" data-ng-if="!navItem.children">\n' +
    '            <!-- If Permissions -->\n' +
    '            <h4 data-ng-show="navItem.permissions" class="panel-title" data-only-access data-permissions="{{navItem.permissions}}">\n' +
    '              <a data-ng-if="navItem.type === \'scroll-to\'" data-scroll-to="{{navItem.ref}}" href="#" data-offset="20">{{navItem.title}}</a>\n' +
    '              <a data-ng-if="navItem.type === \'ui-sref\'" ui-sref="{{navItem.ref}}" data-offset="20" ui-sref-active="active">{{navItem.title}}</a>\n' +
    '              <a data-ng-if="navItem.type === \'href\'" href="{{navItem.href}}" data-offset="20">{{navItem.title}}</a>\n' +
    '            </h4>\n' +
    '            <!-- If no permissions -->\n' +
    '            <h4 data-ng-hide="navItem.permissions" class="panel-title">\n' +
    '              <a data-ng-if="navItem.type === \'scroll-to\'" data-scroll-to="{{navItem.ref}}" href="#" data-offset="20">\n' +
    '                {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '                <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '              </a>\n' +
    '              <a data-ng-if="navItem.type === \'ui-sref\'" ui-sref="{{navItem.ref}}" data-offset="20" ui-sref-active="active" data-ng-class="{\'parent-with-detail\' : !!navItem.detail}">\n' +
    '                {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '                <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '              </a>\n' +
    '              <a data-ng-if="navItem.type === \'href\'" href="{{navItem.href}}" data-offset="20">\n' +
    '                {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '                <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '              </a>\n' +
    '            </h4>\n' +
    '          </div>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '  </nav>\n' +
    '</div>');
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
    '<ul class="progress-list list-group" data-ng-repeat="item in progressListItems">\n' +
    '    <li ng-class="item.active ? \'list-group-item active\' : \'list-group-item\'">\n' +
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

/*
 * ngGovUk
 * Author: James A B Gray
 * Version: 0.0.4 - 2015-12-17
 * License: 
 */
angular.module("ngGovUk", ["ngGovUk.footer","ngGovUk.global-nav","ngGovUk.nav-side","ngGovUk.tabbed-menu"]);
angular.module("footer/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer/footer.html",
    "<footer id=\"footer\" class=\"cpp-footer\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-10\">\n" +
    "        <div class=\"footer-meta-inner\">\n" +
    "          <nav>\n" +
    "            <ul id=\"menu-footer\" class=\"menu list-inline\">\n" +
    "              <li class=\"menu-all-government-blogs\"><a href=\"https://www.blog.gov.uk\">All GOV.UK blogs</a></li>\n" +
    "              <li class=\"menu-all-government-blog-posts\"><a href=\"https://www.blog.gov.uk/all-posts/\">All GOV.UK blog posts</a></li>\n" +
    "              <li class=\"menu-gov-uk\"><a href=\"https://www.gov.uk\">GOV.UK</a></li>\n" +
    "              <li class=\"menu-all-departments\"><a href=\"https://www.gov.uk/government/organisations\">All departments</a></li>\n" +
    "              <li class=\"menu-all-topics\"><a href=\"https://www.gov.uk/government/topics\">All topics</a></li>\n" +
    "              <li class=\"menu-all-policies\"><a href=\"https://www.gov.uk/government/policies\">All policies</a></li>\n" +
    "              <li class=\"menu-cookies\"><a href=\"https://www.blog.gov.uk/cookies\">Cookies</a></li>\n" +
    "            </ul>\n" +
    "          </nav>\n" +
    "          <div class=\"open-government-licence\">\n" +
    "            <p class=\"logo\">\n" +
    "              <a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\">Open Government Service</a>\n" +
    "            </p>\n" +
    "            <p>All content is available under the <a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\" rel=\"license\">Open Government Licence v3.0</a>, except where otherwise stated</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-2 text-right\">\n" +
    "        <div id=\"crown-copy-cont\" class=\"text-center\">\n" +
    "          <div class=\"logo\">\n" +
    "              <a class=\"crown-copy\" href=\"https://www.nationalarchives.gov.uk/information-management/our-services/crown-copyright.htm\">&copy; Crown copyright</a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>\n" +
    "");
}]);

'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ui.cpp.footer', []);

// footer Service Template
angular.module('ui.cpp.footer').factory('footerService', function() {

  var footer = { };

  return footer;

});

// footer Filter Template
angular.module('ui.cpp.footer').filter('footerFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// footer Directive Template
angular.module('ui.cpp.footer').directive('footerDirective', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // replace: true,
    // transclude: true,
    templateUrl: 'footer/footer.html',
    link: function (scope, element, attrs, fn) {

    }
  };
});



angular.module("global-nav/global-nav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("global-nav/global-nav.html",
    "<header class=\"navbar navbar-default\">\n" +
    "  <div class=\"navbar-content\">\n" +
    "    <div class=\"navbar-inner\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"navbar-header col-md-4\">\n" +
    "            <div class=\"header-logo clearfix\">\n" +
    "              <a href=\"#!/\" role=\"button\" class=\"navbar-brand text-uppercase\">\n" +
    "                <img width=\"35\" height=\"31\" alt=\"\" src=\"assets/img/gov.uk_logotype_crown_invert_trans.png\" /> GOV.UK\n" +
    "              </a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-8\">\n" +
    "            <h3 class=\"navbar-title\" data-ng-if=\"globalNav.pageTitle\">\n" +
    "              <a data-ng-if=\"globalNav.pageTitle.type === 'href'\" href=\"#\">{{globalNav.pageTitle.title}}</a>\n" +
    "              <a data-ng-if=\"globalNav.pageTitle.type === 'ui-sref'\" data-ui-sref=\"#\">{{globalNav.pageTitle.title}}</a>\n" +
    "              <span data-ng-if=\"globalNav.pageTitle.type === 'text'\">{{globalNav.pageTitle.title}}</span>\n" +
    "            </h3>\n" +
    "            <button data-ng-if=\"globalNav.navItems\" type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\"\n" +
    "                    data-ng-click=\"globalNav.isCollapsed = !globalNav.isCollapsed\"\n" +
    "                    data-ng-class=\"{'nav-open': globalNav.isCollapsed}\">\n" +
    "              <span class=\"sr-only\">Toggle navigation</span>\n" +
    "              Menu\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\" data-ng-if=\"globalNav.navItems\">\n" +
    "          <nav class=\"navbar-right col-md-8 col-md-offset-4\">\n" +
    "            <ul class=\"nav navbar-nav proposition-links\" id=\"props\" data-collapse=\"!globalNav.isCollapsed\">\n" +
    "              <li data-ng-repeat=\"item in globalNav.navItems\">\n" +
    "                <a data-ng-if=\"item.type === 'href'\" href=\"{{item.ref}}\">{{item.title}}</a>\n" +
    "                <a data-ng-if=\"item.type === 'ui-sref'\" data-ui-sref=\"{{item.ref}}\">{{item.title}}</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </nav>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"global-header-bar\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</header>\n" +
    "");
}]);

'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ui.cpp.global-nav', []);

// globalNav Service Template
angular.module('ui.cpp.global-nav').factory('globalNavService', function() {

  var globalNav = {
    isCollapsed: true
  };

  return globalNav;

});

// globalNav Filter Template
angular.module('ui.cpp.global-nav').filter('globalNavFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// globalNav Directive Template
angular.module('ui.cpp.global-nav').directive('globalNav', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    replace: true,
    transclude: true,
    templateUrl: 'global-nav/global-nav.html',
    link: function (scope, element, attrs, fn) {

    }
  };
});



angular.module("nav-side/nav-side.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("nav-side/nav-side.html",
    "<div class=\"nav-side\">\n" +
    "  <nav>\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\"\n" +
    "              class=\"navbar-toggle side-nav-toggle\"\n" +
    "              data-toggle=\"isCollapsed = !isCollapsed\"\n" +
    "              data-ng-click=\"isCollapsed = !isCollapsed\"\n" +
    "              data-ng-class=\"{'nav-open': isCollapsed}\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar-title\" data-ng-bind=\"collapseTitle\"></span>\n" +
    "        <span class=\"icon-bars\">\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "        </span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <div class=\"navbar-collapse\" data-collapse=\"isCollapsed\">\n" +
    "      <ul class=\"accordion\">\n" +
    "        <li data-accordion data-ng-repeat=\"navItem in navigationItems\">\n" +
    "          <ul data-accordion-group heading=\"{{navItem.title}}\"  ng-class=\"{'active':isOpen(navItem)}\" is-open=\"{{ isOpen(navItem) }}\" ui-sref-active=\"active\" data-ng-if=\"navItem.children\" class=\"nav-item nav-item-with-children\">\n" +
    "            <li data-ng-repeat=\"subNavItem in navItem.children\">\n" +
    "\n" +
    "              <!-- If Permissions -->\n" +
    "              <a data-ng-if=\"subNavItem.type === 'scroll-to'\" data-ng-show=\"subNavItem.permissions\" data-only-access data-permissions=\"{{subNavItem.permissions}}\" data-scroll-to=\"{{subNavItem.ref}}\" href=\"#\" offset=\"20\" class=\"subnav-link clearfix\" data-ng-class=\"{'has-detail' : !!subNavItem.detail}\">\n" +
    "                <span class=\"list-item-title\">{{subNavItem.title}}</span>\n" +
    "                <span data-ng-if=\"!!subNavItem.detail\" class=\"list-item-detail\" data-ng-bind-html=\"subNavItem.detail\"></span>\n" +
    "              </a>\n" +
    "              <!-- If no permissions -->\n" +
    "              <a data-ng-if=\"subNavItem.type === 'scroll-to'\" data-ng-hide=\"subNavItem.permissions\" data-scroll-to=\"{{subNavItem.ref}}\" href=\"#\" offset=\"20\" class=\"subnav-link clearfix\" data-ng-class=\"{'has-detail' : !!subNavItem.detail}\">\n" +
    "                <span class=\"list-item-title\">{{subNavItem.title}}</span>\n" +
    "                <span data-ng-if=\"!!subNavItem.detail\" class=\"list-item-detail\" ng-bind-html=\"subNavItem.detail\"></span>\n" +
    "              </a>\n" +
    "\n" +
    "\n" +
    "\n" +
    "              <!-- If Permissions -->\n" +
    "              <a data-ng-if=\"subNavItem.type === 'ui-sref'\" data-ng-show=\"subNavItem.permissions\" data-only-access data-permissions=\"{{subNavItem.permissions}}\" ui-sref=\"{{subNavItem.ref}}\" ui-sref-active=\"active\" offset=\"20\" class=\"subnav-link clearfix\" data-ng-class=\"{'has-detail' : !!subNavItem.detail}\">\n" +
    "                <span class=\"list-item-title\">{{subNavItem.title}}</span>\n" +
    "                <span data-ng-if=\"!!subNavItem.detail\" class=\"list-item-detail\" ng-bind-html=\"subNavItem.detail\"></span>\n" +
    "              </a>\n" +
    "              <!-- If no permissions -->\n" +
    "              <a data-ng-if=\"subNavItem.type === 'ui-sref'\" data-ng-hide=\"subNavItem.permissions\" ui-sref=\"{{subNavItem.ref}}\" ui-sref-active=\"active\" offset=\"20\" class=\"subnav-link clearfix\" data-ng-class=\"{'has-detail' : !!subNavItem.detail}\">\n" +
    "                <span class=\"list-item-title\">{{subNavItem.title}}</span>\n" +
    "                <span data-ng-if=\"!!subNavItem.detail\" class=\"list-item-detail\" ng-bind-html=\"subNavItem.detail\"></span>\n" +
    "              </a>\n" +
    "\n" +
    "\n" +
    "\n" +
    "              <!-- If Permissions -->\n" +
    "              <a data-ng-if=\"subNavItem.type === 'href'\" data-ng-show=\"subNavItem.permissions\" data-only-access data-permissions=\"{{subNavItem.permissions}}\" href=\"{{subNavItem.ref}}\" offset=\"20\" class=\"subnav-link clearfix\" data-ng-class=\"{'has-detail' : !!subNavItem.detail}\">\n" +
    "                <span class=\"list-item-title\">{{subNavItem.title}}</span>\n" +
    "                <span data-ng-if=\"!!subNavItem.detail\" class=\"list-item-detail\" ng-bind-html=\"subNavItem.detail\"></span>\n" +
    "              </a>\n" +
    "              <!-- If no permissions -->\n" +
    "              <a data-ng-if=\"subNavItem.type === 'href'\" data-ng-hide=\"subNavItem.permissions\" href=\"{{subNavItem.ref}}\" offset=\"20\" class=\"subnav-link clearfix\" data-ng-class=\"{'has-detail' : !!subNavItem.detail}\">\n" +
    "                <span class=\"list-item-title\">{{subNavItem.title}}</span>\n" +
    "                <span data-ng-if=\"!!subNavItem.detail\" class=\"list-item-detail\" ng-bind-html=\"subNavItem.detail\"></span>\n" +
    "              </a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          <div class=\"panel-heading nav-item\" data-ng-if=\"!navItem.children\">\n" +
    "            <!-- If Permissions -->\n" +
    "            <h4 data-ng-show=\"navItem.permissions\" class=\"panel-title\" data-only-access data-permissions=\"{{navItem.permissions}}\">\n" +
    "              <a data-ng-if=\"navItem.type === 'scroll-to'\" data-scroll-to=\"{{navItem.ref}}\" href=\"#\" offset=\"20\">{{navItem.title}}</a>\n" +
    "              <a data-ng-if=\"navItem.type === 'ui-sref'\" ui-sref=\"{{navItem.ref}}\" offset=\"20\" ui-sref-active=\"active\">{{navItem.title}}</a>\n" +
    "              <a data-ng-if=\"navItem.type === 'href'\" href=\"{{navItem.href}}\" offset=\"20\">{{navItem.title}}</a>\n" +
    "            </h4>\n" +
    "            <!-- If no permissions -->\n" +
    "            <h4 data-ng-hide=\"navItem.permissions\" class=\"panel-title\">\n" +
    "              <a data-ng-if=\"navItem.type === 'scroll-to'\" data-scroll-to=\"{{navItem.ref}}\" href=\"#\" offset=\"20\">{{navItem.title}}</a>\n" +
    "              <a data-ng-if=\"navItem.type === 'ui-sref'\" ui-sref=\"{{navItem.ref}}\" offset=\"20\" ui-sref-active=\"active\">{{navItem.title}}</a>\n" +
    "              <a data-ng-if=\"navItem.type === 'href'\" href=\"{{navItem.href}}\" offset=\"20\">{{navItem.title}}</a>\n" +
    "            </h4>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </nav>\n" +
    "</div>\n" +
    "");
}]);

'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ui.cpp.nav-side', []);

// navSide Service Template
angular.module('ui.cpp.nav-side').factory('navSideService', function() {

  var navSide = { };

  return navSide;

});

// navSide Filter Template
angular.module('ui.cpp.nav-side').filter('navSideFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// navSide Directive Template
angular.module('ui.cpp.nav-side').directive('navSideDirective', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      collapseTitle: '=',
      navigationItems: '=',
      currentState: '='
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
     restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // replace: true,
    // transclude: true,
    templateUrl: 'nav-side/nav-side.html',
    link: function (scope) {
      scope.isCollapsed = false;

      scope.isOpen = function(item){
        var result

        result = false;
        if (item && item.children && scope.currentState && scope.currentState.name){
          for(var i = 0; i<item.children.length; i++){
            if (item.children[i].ref.indexOf(scope.currentState.name) !== -1){
              result = true;
              break;
            }
          }
        }
        return result;
      };

      window.onload = updateCollapsedStatus;
      window.onresize = updateCollapsedStatus;

      function updateCollapsedStatus () {
        var windowWidth = window.innerWidth;

        if (windowWidth < 768) {
          scope.isCollapsed = true;
        } else {
          scope.isCollapsed = false;
        }
        scope.$apply();
      }
    }
  };
});



angular.module("tabbed-menu/tabbed-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tabbed-menu/tabbed-menu.html",
    "<div class=\"tabbedMenu\">\n" +
    "  <nav>\n" +
    "    <ul class=\"nav nav-tabs\">\n" +
    "      <li class=\"nav-title\" data-ng-if=\"tabbedItems.title\" data-ng-bind=\"tabbedItems.title\"></li>\n" +
    "      <li data-ng-repeat=\"item in tabbedItems.items\">\n" +
    "        <a ui-sref=\"item.ref\" data-ng-bind=\"item.title\"></a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </nav>\n" +
    "</div>\n" +
    "");
}]);

'use strict';
// Define module & include the cpp.ui as a dependency
angular.module('ui.cpp.tabbed-menu', []);

// tabbedMenu Service Template
angular.module('ui.cpp.tabbed-menu').factory('tabbedMenuService', function() {

  var tabbedMenu = { };

  return tabbedMenu;

});

// tabbedMenu Filter Template
angular.module('ui.cpp.tabbed-menu').filter('tabbedMenuFilter', function () {
  return function (input, arg) {
    return 'output';
  };
});

// tabbedMenu Directive Template
angular.module('ui.cpp.tabbed-menu').directive('tabbedMenu', function () {
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      tabbedItems: '='
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // replace: true,
    // transclude: true,
    templateUrl: 'tabbed-menu/tabbed-menu.html',
    link: function (scope, element, attrs, fn) {

    }
  };
});



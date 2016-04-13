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

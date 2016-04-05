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

angular.module("progress-list/progress-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("progress-list/progress-list.html",
    " <div data-progress-list  data-progress-list-items=\"progressListItems\">\n"+
    "   <ul class=\"progress-list list-group\" data-ng-repeat=\"item in progressListItems\">\n"+
    "     <li ng-class=\"item.active ? 'list-group-item active' : 'list-group-item'\">\n"+
    "       <h4>{{$index + 1}}. {{item.title}}</h4>\n"+
    "       <span ng-if=\"item.state && item.complete\"><span class=\"glyphicon glyphicon-ok success-color\"></span>Complete</span>\n"+
    "       <span ng-if=\"item.state && !item.complete\">Incomplete</span>\n"+
    "     </li>\n"+
    "   </ul>\n"+
    " </div>\n"+
    "");
}]);

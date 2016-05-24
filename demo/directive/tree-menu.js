angular.module('app').directive('treeMenu', function($compile) {
  return {
    restrict: 'E',
    replace:true,
    templateUrl: 'the-tree.html',
    link: function(scope, elm, attrs) {

      //$(elm).parent('ul').find('span.leaf').on('click', function (e) {
      $(elm).find('span.leaf').on('click', function (e) {

        var children = $(elm).find('li');

        if (children.is(":visible")) {
          children.hide('fast');
          $(elm).find('span.leaf i.icon-minus-sign').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        }
        else{

          children.show('fast');
          $(elm).find('span.leaf i.icon-plus-sign').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
      });


      scope.nodeClicked = function(node) {
        node.checked = !node.checked;
        function checkChildren(c) {
          angular.forEach(c.children, function(c) {
            c.checked = node.checked;
            checkChildren(c);
          });
        }
        checkChildren(node);
      };

      scope.switcher = function(booleanExpr, trueValue, falseValue) {
        return booleanExpr ? trueValue : falseValue;
      };

      scope.isLeaf = function(_data) {
        if (_data.children.length == 0) {
          return true;
        }
        return false;
      };


      if (scope.node.children.length > 0) {
        var childNode = $compile('<ul ><node-tree ng-model="node.children"></node-tree></ul>')(scope)
        elm.append(childNode);
      }
    }
  };
});

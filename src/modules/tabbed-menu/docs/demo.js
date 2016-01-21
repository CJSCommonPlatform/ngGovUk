angular.module('app').controller('tabbedMenuDemoCtrl', function ($scope) {
  $scope.tabbedItems = {
    title: 'View:',
    items: [
      {
        title: 'Cases added today',
        ref: ''
      },
      {
        title: 'All cases',
        ref: ''
      }
    ]
  };

});

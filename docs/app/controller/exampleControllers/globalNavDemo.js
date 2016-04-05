(function() {
  'use strict';

  angular
    .module('app')
    .controller('globalNavDemo', Controller);

  function Controller($scope) {
    activate();

    ////////////////

    function activate() {
      $scope.demoNav = {
        pageTitle: {
          title: 'Demo Title',
          type: 'text',
          ref: '#'
        },
        navItems: [
          {
            title: 'Nav Item 1',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: 'Nav Item 2',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: 'Nav Item 3',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: 'Nav Item 4',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: ' Nav Item 5',
            type: 'href',
            ref: '#!/modules'
          }
        ],
        displaySettings:{
          showUnderline: true
        }
      };
    }
  }
})();

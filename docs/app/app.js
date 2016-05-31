(function () {
  'use strict';

  angular.module('app')
    .run(function ($rootScope) {
      // set the body class
      var globalNav;

      $rootScope.breaks = 'fluid';

      globalNav = {
        pageTitle: {
          title: 'ngGovUk',
          type: 'text',
          ref: '#'
        },
        navItems: [
          {
            title: 'Getting Started',
            type: 'href',
            ref: '#!/'
          },
          {
            title: 'CSS Elements',
            type: 'href',
            ref: '#!/css'
          },
          {
            title: 'UI Components',
            type: 'href',
            ref: '#!/components'
          },
          {
            title: 'Ng Modules',
            type: 'href',
            ref: '#!/modules'
          },
          {
            title: 'Playground',
            type: 'href',
            ref: '#!/playground'
          },
        ],
        displaySettings:{
          showUnderline: true
        }
      };

      $rootScope.globalNav = globalNav;
  })

  .directive('metaAnchor', function ($document) {
    return {
      link: function (scope, elem, attrs) {
        var id = attrs.metaAnchor;

        elem.bind('click', scrollToId);

        scope.$on('$destroy', function() {
          elem.unbind(scrollToId);
        });

        function scrollToId() {
          var body = $document.find('body');
          var target = body[0].querySelector('#' + id);
          body[0].scrollTop = target.offsetTop;
        }
      }
    };
  });
})();

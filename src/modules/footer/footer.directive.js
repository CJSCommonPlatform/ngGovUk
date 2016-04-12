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

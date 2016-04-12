(function () {
  'use strict';

  describe('footer directive', function () {
    var $scope, $compile, template, element;

    beforeEach(module('templates'));
    beforeEach(module('ngGovUk.footer.footer-directive'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$sce_) {
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
    }));

    describe('when no custom settings are set', function () {
      beforeEach(function () {
        $scope.settings = { };
        template = '<div data-footer-directive data-footer-settings="settings"></div>';
        element = $compile(template)($scope);
      });

      describe('after initialisation', function () {
        beforeEach(function () {
          $scope.$digest();
        });

        it('should have default settings defined', function () {
          expect($scope.settings).toBeDefined();
          expect($scope.settings.links).toBeDefined();
          expect($scope.settings.copyright).toBeDefined();
          expect($scope.settings.licence).toBeDefined();
        });
      });
    });

    describe('when custom settings are set', function () {
      var mockSettings = {
        links: [
          { title: 'Sample link', ref: 'http://somelink.com', type: 'href' },
          { title: 'Internal route link', ref: 'route-name', type: 'ui-sref' }
        ],
        copyright: {
          text: 'Custom copyright'
        },
        licence: {
          text: 'Test <span>HTML</span> value'
        }
      };

      beforeEach(function () {
        $scope.settings = mockSettings;

        template = '<div data-footer-directive data-footer-settings="settings"></div>';
        element = $compile(template)($scope);
      });

      describe('after initialisation', function () {
        beforeEach(function () {
          $scope.$digest();
        });

        describe('when customizing links', function () {
          var linkList;

          beforeEach(function () {
            linkList = element.find('#menu-footer li');
          });

          it('should have custom links defined', function () {
            expect($scope.settings.links).toEqual(mockSettings.links);
          });

          it('should define normal link anchor', function () {
            var linkElement = angular.element(linkList[0]).find('a');

            expect(linkElement.attr('href')).toEqual('http://somelink.com');
            expect(linkElement[0].hasAttribute('ui-sref')).toBe(false);
          });

          it('should define ui-sref link anchor', function () {
            var linkElement = angular.element(linkList[1]).find('a');

            expect(linkElement.attr('data-ui-sref')).toEqual('route-name');
            expect(linkElement[0].hasAttribute('href')).toBe(false);
          });
        });

        it('should have custom copyright details defined', function () {
          expect($scope.settings.copyright).toEqual(mockSettings.copyright);
        });

        it('should have custom licence details defined', function () {
          expect($scope.settings.licence).toEqual(mockSettings.licence);
        });

        it('should allow to use HTML for licence text value', function () {
          var textElement = element.find('.licence-text');
          expect(textElement.text()).toEqual('Test HTML value');
        });
      });
    });
  });

})();

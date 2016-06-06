(function () {
  'use strict';

  describe('lazy-validation-on-click directive', function () {
    var lazyValidationController, $compile, $scope, template, buttonElem, $window, smoothScroll;

    function compileDirective(template) {
      mockDirectiveController(
        'lazyValidation',
        lazyValidationController,
        template
      );

      return $compile(template)($scope);
    }

    function mockDirectiveController(directiveName, controller, element) {
      element.data('$' + directiveName + 'Controller', controller);
      return element;
    }

    beforeEach(module('ngGovUk.form-validation.lazy-validation-on-click'));

    beforeEach(function () {
      smoothScroll = jasmine.createSpy();
      $window = {
        document: {
            getElementById: jasmine.createSpy()
        }
      };

      module(function ($provide) {
        $provide.value('$window', $window);
        $provide.value('smoothScroll', smoothScroll);
      });

      inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;

        lazyValidationController = {
          revalidate: jasmine.createSpy('revalidate'),
          isValid: jasmine.createSpy('isValid')
        };
      });
    });

    describe('when callback attribute has been set', function () {
      beforeEach(function () {
        template = angular.element('<div><button move-page-to="error-summary" ' +
                                            'lazy-validation-on-click="callback()"></button></div>');
        $scope.callback = jasmine.createSpy('callback');
        buttonElem = compileDirective(template).find('button');
      });

      describe('and form was valid', function () {
        beforeEach(function () {
          lazyValidationController.isValid = jasmine
            .createSpy('isValid')
            .and
            .returnValue(true);
        });

        describe('and element has been clicked', function () {
          beforeEach(function () {
            buttonElem.triggerHandler('click');
          });

          it('should revalidate the form', function () {
            expect(lazyValidationController.revalidate).toHaveBeenCalled();
          });

          it('should trigger the callback', function () {
            expect($scope.callback).toHaveBeenCalled();
          });
        });
      });

      describe(', form was NOT valid and id provided exists in the document', function () {
        beforeEach(function () {
          lazyValidationController.isValid = jasmine
            .createSpy('isValid')
            .and
            .returnValue(false);
          var element = angular.element('<div></div>');
          $window.document.getElementById.and.returnValue(element);
        });

        describe('and element has been clicked', function () {
          beforeEach(function () {
            buttonElem.triggerHandler('click');
          });

          it('should revalidate the form', function () {
            expect(lazyValidationController.revalidate).toHaveBeenCalled();
          });

          it('should NOT trigger the callback', function () {
            expect($scope.callback).not.toHaveBeenCalled();
          });

          it('should scroll to the id provided', function() {
              expect($window.document.getElementById).toHaveBeenCalled();
              expect(smoothScroll).toHaveBeenCalled();
          });
        });
      });

      describe(', form was NOT valid and id provided does NOT exist in the document', function () {
        beforeEach(function () {
          lazyValidationController.isValid = jasmine
            .createSpy('isValid')
            .and
            .returnValue(false);
          $window.document.getElementById.and.returnValue(null);
        });

        describe('and element has been clicked', function () {
          beforeEach(function () {
            buttonElem.triggerHandler('click');
          });

          it('should revalidate the form', function () {
            expect(lazyValidationController.revalidate).toHaveBeenCalled();
          });

          it('should NOT trigger the callback', function () {
            expect($scope.callback).not.toHaveBeenCalled();
          });

          it('should scroll to the id provided', function() {
              expect($window.document.getElementById).toHaveBeenCalled();
              expect(smoothScroll).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when callback attribute has NOT been set', function () {
      describe('and there were no other event handlers', function () {
        beforeEach(function () {
          template = angular.element('<div><button lazy-validation-on-click></button></div>');
          buttonElem = compileDirective(template).find('button');
        });

        describe('and element has been clicked', function () {
          beforeEach(function () {
            buttonElem.triggerHandler('click');
          });

          it('should revalidate the form', function () {
            expect(lazyValidationController.revalidate).toHaveBeenCalled();
          });
        });
      });

      describe('but there was callback set with ng-click', function () {
        beforeEach(function () {
          template = angular.element('<div><button ng-click="callback()" lazy-validation-on-click></button></div>');
          $scope.callback = jasmine.createSpy('callback');

          buttonElem = compileDirective(template).find('button');
        });

        it('should trigger callback AFTER revalidate is called', function () {
          var validationChange = null;

          lazyValidationController.revalidate = jasmine.createSpy('revalidate').and.callFake(function () {
            // This code should be executed first
            validationChange = 'ValidationHasChanged';
          });

          $scope.callback = jasmine.createSpy('callback').and.callFake(function () {
            // Assuming this ng-click callback executes AFTER idamValidation.revalidate
            // this variable should be already updated
            expect(validationChange).toBe('ValidationHasChanged');
          });

          buttonElem.triggerHandler('click');

          expect($scope.callback).toHaveBeenCalled();
          expect(lazyValidationController.revalidate).toHaveBeenCalled();
        });
      });
    });
  });
})();

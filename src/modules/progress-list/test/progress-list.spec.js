describe('progressList', function () {
  
  beforeEach(angular.mock.module('ngGovUk'));
  beforeEach(module('ngGovUk.progress-list','progress-list/progress-list.html'));

  var $compile, scope, $exceptionHandler, $compileProvider,items;

  beforeEach(module(function (_$compileProvider_) {
    $compileProvider = _$compileProvider_;
  }));

  beforeEach(module(function ($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));

  beforeEach(inject(function (_$compile_, $rootScope, _$exceptionHandler_) {
    $compile = _$compile_;
    $exceptionHandler = _$exceptionHandler_;
    scope = $rootScope.$new();

    var elementScope = $compile(
      '<div data-progress-list-directive  data-progress-list-items="progressListItems"></div>')(scope);
    scope.$apply();

    items = scope.progressListItems;

  }));

  it('should define an array of objects', function () {
    expect(scope.progressListItems).toBeDefined();
  });

  describe('object', function () {


    it('should have title property', function () {
      for(var x = 0; x < items.length; x++) {
        expect(items[x].title).toBeDefined();
      }
    });

    it('should have active property', function () {
      for(var x = 0; x < items.length; x++) {
        expect(items[x].active).toBeDefined();
      }
    });

    it('should have access property', function () {
      for(var x = 0; x < items.length; x++) {
        expect(items[x].access).toBeDefined();
      }
    });

    it('should have complete property', function () {
      for(var x = 0; x < items.length; x++) {
        expect(items[x].complete).toBeDefined();
      }
    });

  });
});

'use strict';
        
describe('ToolbarController', function () {

    beforeEach(module('spirit99'));

    beforeEach(function () {
        module(function($provide) {
            $provide.service('StationManager', mockStationManager);
        
            mockStationManager.$inject = [];
        
            function mockStationManager () {
                var self = this;
                self.property = {};
                self.getTitle = jasmine.createSpy('getTitle')
                .and.callFake(function () {
                    return 'Mocked Station';
                });
            }
        });        
    });

    var toolbarVM, $rootScope;
    beforeEach(inject(function ($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        toolbarVM = $controller('ToolbarController', {
            $scope: $rootScope.$new()
        });
    }));

    describe(' - Initial activate()', function () {
        it(' - station title should be "Mocked Station"', function () {
            expect(toolbarVM.stationTitle).toEqual('Mocked Station');
        });
    });
});

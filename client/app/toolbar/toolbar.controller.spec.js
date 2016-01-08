'use strict';
        
describe('ToolbarController', function () {

    beforeEach(module('spirit99'));

    beforeEach(function () {
        module(function($provide) {
            $provide.service('StationManager', mockStationManager);
        
            mockStationManager.$inject = ['DEFAULTS'];
        
            function mockStationManager (DEFAULTS) {
                var self = this;
                self.property = {};
                self.getStation = jasmine.createSpy('getStation')
                .and.callFake(function () {
                    return DEFAULTS.stations[Object.keys(DEFAULTS.stations)[0]];
                });
            }
        });        
    });

    var toolbarVM, $rootScope, DEFAULTS;
    beforeEach(inject(function ($controller, _$rootScope_, _DEFAULTS_) {
        $rootScope = _$rootScope_;
        DEFAULTS = _DEFAULTS_;
        toolbarVM = $controller('ToolbarController', {
            $scope: $rootScope.$new()
        });
    }));

    describe(' - Initial activate()', function () {
        it(' - station should has title and logoUrl', function () {
            expect(toolbarVM.station.title).not.toBeNull();
            expect(toolbarVM.station.logoUrl).not.toBeNull();
        });
    });
});

'use strict';
        
describe('StationsContrller', function () {

    beforeEach(module('spirit99'));

    // Mock dependencies
    beforeEach(function() {
        module(function($provide) {
            $provide.service('StationsManager', mockStationsManager);
        
            mockStationsManager.$inject = ['DEFAULTS'];
        
            function mockStationsManager (DEFAULTS) {
                var self = this;
                // self.property = {};
                self.getStations = jasmine.createSpy('getStations')
                .and.callFake(function () {
                    return DEFAULTS.stations;
                });
            }
        });        
    });

    var stationsVM, $rootScope, DEFAULTS;
    beforeEach(inject(function ($controller, _$rootScope_, _DEFAULTS_) {
        $rootScope = _$rootScope_;
        DEFAULTS = _DEFAULTS_;
        stationsVM = $controller('StationsController', {
            $scope: $rootScope.$new()
        });
    }));

    describe(' - Initially', function () {
        it(' - Actions panel should hide', function() {
            expect(stationsVM.showToolbar).toBe(false);
        });
    });

    describe(' - Check/Uncheck stations', function () {
        it(' - Show toolbar if at least 1 station checked', function () {
            stationsVM.stations[Object.keys(stationsVM.stations)[0]].isChecked = true;
            $rootScope.$digest();
            expect(stationsVM.showToolbar).toBe(true);
        });

        it(' - Hide toolbar if no station is checked', function() {
            for (var id in stationsVM.stations) {
                stationsVM.stations[id].isChecked = false;
            };
            $rootScope.$digest();
            expect(stationsVM.showToolbar).toBe(false);            
        });
    });
});

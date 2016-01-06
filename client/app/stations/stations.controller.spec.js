'use strict';
        
describe('StationsContrller', function () {

    beforeEach(module('spirit99'));

    var fakeStations;

    // Mock dependencies
    beforeEach(function() {
        module(function($provide) {
            $provide.service('StationsManager', mockStationsManager);
        
            mockStationsManager.$inject = [];
        
            function mockStationsManager () {
                var self = this;
                // self.property = {};
                self.getStations = jasmine.createSpy('getStations')
                .and.callFake(function () {
                    return fakeStations;
                });
            }
        });        
    });

    var stationsVM, $rootScope;
    beforeEach(inject(function ($controller, _$rootScope_, FakeData) {
        $rootScope = _$rootScope_;
        fakeStations = FakeData.genFakeStations();
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
            stationsVM.stations[0].isChecked = true;
            $rootScope.$digest();
            expect(stationsVM.showToolbar).toBe(true);
        });

        it(' - Hide toolbar if no station is checked', function() {
            stationsVM.stations[1].isChecked = true;
            for (var i = 0; i < stationsVM.stations.length; i++) {
                stationsVM.stations[i].isChecked = false;
            };
            $rootScope.$digest();
            expect(stationsVM.showToolbar).toBe(false);            
        });
    });
});

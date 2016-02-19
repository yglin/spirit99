'use strict';

describe('Service initUtils', function () {

    beforeEach(module('spirit99'));

    // Fake data
    var fakeUserLocation;
    beforeEach(function () {
        fakeUserLocation = {latitude: 24.08116, longitude: 120.54813};
    });

    // Mock dependencies
    beforeEach(function () {

        module(function($provide) {
            $provide.service('MapNavigator', mockMapNavigator);
        
            mockMapNavigator.$inject = ['$q'];
        
            function mockMapNavigator ($q) {
                var self = this;
                // self.property = {};
                self.getUserGeolocation = jasmine.createSpy('getUserGeolocation')
                .and.callFake(function () {
                    return $q.resolve(fakeUserLocation);
                });
            }
        });

    });

    var initUtils;
    var DEFAULTS;
    var ZOOM_LEVELS;
    var $rootScope;
    beforeEach(inject(function (_initUtils_, _DEFAULTS_, _ZOOM_LEVELS_, _$rootScope_) {
        initUtils = _initUtils_;
        DEFAULTS = _DEFAULTS_;
        ZOOM_LEVELS = _ZOOM_LEVELS_;
        $rootScope = _$rootScope_;
    }));

    describe(' - promiseGetInitMapArea()', function () {
        it(' - Should return user location and ZOOM_LEVELS.STREET if got geolocation', function () {
            var getResolved = jasmine.createSpy('getResolved');
            initUtils.promiseGetInitMapArea(initUtils.INIT_MAP_AS_GEOLOCATION).then(getResolved);
            $rootScope.$digest();
            expect(getResolved).toHaveBeenCalledWith({
                center: fakeUserLocation,
                zoom: ZOOM_LEVELS.STREET
            });
        });

        it(' - Should return default location and zoom if failed to get geolocation', function () {
            
        });

        it(' - Should return default location if initialMapScheme is undetermined', function () {
            
        });
    });
});
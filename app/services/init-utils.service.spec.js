'use strict';

describe('Service initUtils', function () {
    var initUtils;
    var DEFAULTS;
    var $rootScope;

    beforeEach(module('spirit99'));

    // Mock dependencies
    beforeEach(function () {
        // module(function($provide) {
        //     $provide.service('userPref', function() {
        //         var self = this;
        //         self.INITIAL_MAP_AS_GEOLOCATION = 1;
        //         self.initialMapScheme = self.INITIAL_MAP_AS_GEOLOCATION;
        //     });
        // });

        module(function($provide) {
            $provide.service('mapNavigator', mockMapNavigator);
        
            mockMapNavigator.$inject = ['$q'];
        
            function mockMapNavigator ($q) {
                var self = this;
                // self.property = {};
                self.getUserGeolocation = jasmine.createSpy('getUserGeolocation')
                .and.callFake(function () {
                    return $q.resolve({latitude: 24.08116, longitude: 120.54813});
                });
            }
        });

    });

    beforeEach(inject(function (_initUtils_, _DEFAULTS_, _$rootScope_) {
        initUtils = _initUtils_;
        DEFAULTS = _DEFAULTS_;
        $rootScope = _$rootScope_;
    }));

    describe(' - promiseGetInitialMapArea()', function () {
        it(' - Should return user location and ZOOM_LEVELS.STREET if got geolocation', function () {
            var getResolved = jasmine.createSpy('getResolved');
            initUtils.promiseGetInitialMapArea(initUtils.INIT_MAP_AS_GEOLOCATION).then(getResolved);
            $rootScope.$digest();
            expect(getResolved).toHaveBeenCalledWith({
                center: {latitude: 24.08116, longitude: 120.54813},
                zoom: DEFAULTS.ZOOM_LEVELS.STREET
            });
        });

        it(' - Should return default location and zoom if failed to get geolocation', function () {
            
        });

        it(' - Should return default location if initialMapScheme is undetermined', function () {
            
        });
    });
});
'use strict';

var fakeData = require('../../../mocks/data.js');

describe('Locator', function () {
    beforeEach(angular.mock.module('spirit99'));

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Map', mockMap);
        
            mockMap.$inject = [];
        
            function mockMap () {
                var self = this;
                // self.property = {};
                self.navigateTo = jasmine.createSpy('navigateTo');
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Geolocation', mockGeolocation);
        
            mockGeolocation.$inject = ['$q'];
        
            function mockGeolocation ($q) {
                var self = this;
                // self.property = {};
                self.prmsGetCurrentPosition = jasmine.createSpy('prmsGetCurrentPosition')
                .and.returnValue($q.resolve(fakeData.geolocation));
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Geocoder', mockGeocoder);
        
            mockGeocoder.$inject = ['$q'];
        
            function mockGeocoder ($q) {
                var self = this;
                // self.property = {};
                self.geocode = jasmine.createSpy('geocode')
                .and.returnValue($q.resolve([
                    fakeData.geocodeChangHua
                ]));
            }
        });
    });

    var Locator, Map, $rootScope;
    beforeEach(inject(function (_Locator_, _Map_, _$rootScope_) {
        Locator = _Locator_;
        Map = _Map_;
        $rootScope = _$rootScope_;
    }));

    describe(' - prmsLocate()', function() {
        
        it(' - Should get geolocation into Locator.locations if selected geolocation', function() {
            Locator.prmsLocate('My Location');
            $rootScope.$digest();
            expect(Locator.locations).toEqual([fakeData.geolocation.coords]);
        });

        // it(' - Should call Geocoder.geocode to locate address', function() {
        //     fail('To be continued...');            
        // });

        it(' - Should call Map.navigateTo() upon the first location', function() {
            Locator.prmsLocate('My Location');
            $rootScope.$digest();
            expect(Map.navigateTo).toHaveBeenCalledWith(Locator.locations[0]);            
        });
    });
});

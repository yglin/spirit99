'use strict';

var fakeData = require('../../../../mocks/data.js');

describe('Locator', function () {
    beforeEach(angular.mock.module('spirit99'));

    var geocodeResults;
    beforeEach(function() {
        geocodeResults = [
            {
                latitude: fakeData.geocodeChangHua.geometry.location.lat(),
                longitude: fakeData.geocodeChangHua.geometry.location.lng(),
                address: fakeData.geocodeChangHua.formatted_address,
                viewport: {
                    southwest: {
                        latitude: fakeData.geocodeChangHua.geometry.viewport.south,
                        longitude: fakeData.geocodeChangHua.geometry.viewport.west
                    },
                    northeast: {
                        latitude: fakeData.geocodeChangHua.geometry.viewport.north,
                        longitude: fakeData.geocodeChangHua.geometry.viewport.east
                    }
                }
            }
        ];    
    });

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Map', MockMap);
        
            MockMap.$inject = [];
        
            function MockMap () {
                var self = this;
                self.ZOOMS = { STREET: 15 };
                self.navigateTo = jasmine.createSpy('navigateTo');
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Geolocation', MockGeolocation);
        
            MockGeolocation.$inject = ['$q'];
        
            function MockGeolocation ($q) {
                var self = this;
                // self.property = {};
                self.prmsGetCurrentPosition = jasmine.createSpy('prmsGetCurrentPosition')
                .and.returnValue($q.resolve(fakeData.geolocation));
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Geocoder', MockGeocoder);
        
            MockGeocoder.$inject = ['$q'];
        
            function MockGeocoder ($q) {
                var self = this;
                // self.property = {};
                self.prmsGeocode = jasmine.createSpy('prmsGeocode')
                .and.returnValue($q.resolve(geocodeResults));
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('localStorageService', MockLocalStorageService);
        
            MockLocalStorageService.$inject = [];
        
            function MockLocalStorageService () {
                var self = this;
                self.locationQueries = angular.copy(fakeData.locationQueries);
                self.get = jasmine.createSpy('get')
                .and.returnValue(self.locationQueries);
                self.set = jasmine.createSpy('set')
                .and.callFake(function (name, queries) {
                    self.locationQueries = queries;
                });
            }
        });
    });

    var Locator, Map, $rootScope, localStorage;
    beforeEach(inject(function (_Locator_, _Map_, _$rootScope_, localStorageService) {
        Locator = _Locator_;
        Map = _Map_;
        $rootScope = _$rootScope_;
        localStorage = localStorageService;
    }));

    describe(' - prmsLocate()', function() {
        
        it(' - Should get geolocation into Locator.locations if selected geolocation', function() {
            Locator.prmsLocate('My Location');
            $rootScope.$digest();
            expect(Locator.locations).toEqual([angular.extend({}, fakeData.geolocation.coords, {zoom: Map.ZOOMS.STREET})]);
        });

        it(' - Should call Geocoder.prmsGeocode to get gecoded locations', function() {
            Locator.prmsLocate('Do do lu do do do lu do da da da');
            $rootScope.$digest();
            expect(Locator.locations).toEqual(geocodeResults);
        });

        it(' - Should call Map.navigateTo() upon the first location', function() {
            Locator.prmsLocate('My Location');
            $rootScope.$digest();
            expect(Map.navigateTo).toHaveBeenCalledWith(Locator.locations[0]);            
        });
    });

    describe(' - addQueryHistory()', function() {
        var newLocationQuery;
        beforeEach(function() {
            newLocationQuery = {
                title: '台灣',
                address: 'We are small people living in a small country, also good people living in a good country.'
            };            
        });
        
        it(' - Should add query to local storage if it\'s title not in storage yet', function() {
            Locator.addQueryHistory(newLocationQuery.title, newLocationQuery.address);
            expect(localStorage.locationQueries[localStorage.locationQueries.length - 1]).toEqual(newLocationQuery);
            var queriesCount = localStorage.locationQueries.length;
            Locator.addQueryHistory(newLocationQuery.title, newLocationQuery.address);
            expect(localStorage.locationQueries.length).toBe(queriesCount);
        });

        it(' - Should keep only max 10 location queries in history', function() {
            for (var i = 0; i < 11; i++) {
                Locator.addQueryHistory(newLocationQuery.title + '-' + (i+1), newLocationQuery.address);            
            }
            expect(localStorage.locationQueries.length).toBe(10);
            expect(localStorage.locationQueries[0].title).toEqual(newLocationQuery.title + '-2');
        });
    });
});

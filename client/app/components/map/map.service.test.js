'use strict';

var mockGeolocation = require('../../../mocks/geolocation.js');
        
describe('Map', function () {
    beforeEach(angular.mock.module('spirit99'));

    var fakePosition;

    // Mock dependencies
    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Dialog', mockDialog);
        
            mockDialog.$inject = ['$q'];
        
            function mockDialog ($q) {
                var self = this;
                self.property = {};
                self.confirm = jasmine.createSpy('confirm')
                .and.callFake(function () {
                    return $q.resolve();
                });
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Post', mockPost);
        
            mockPost.$inject = ['$q'];
        
            function mockPost ($q) {
                var self = this;
                // self.property = {};
                self.prmsCreate = jasmine.createSpy('prmsCreate')
                .and.callFake(function () {
                    return $q.resolve();
                });
            }
        });
        
        mockGeolocation.addMockGeolocation(fakePosition);
    });

    var Map, localStorage, $rootScope, $timeout, scope, Post, Dialog, $q, $window;
    beforeEach(inject(function (_Map_, _$rootScope_, _$timeout_, _Post_, _Dialog_, localStorageService, _$q_, _$window_) {
        Map = _Map_;
        localStorage = localStorageService;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        scope = $rootScope.$new();
        Post = _Post_;
        Dialog = _Dialog_;
        $q = _$q_;
        $window = _$window_;

        // Mock navigator.geolocation.getCurrentPosition()
        if(typeof $window.navigator === 'undefined'){
            $window.navigator = {};
        }
        if(typeof $window.navigator.geolocation === 'undefined'){
            $window.navigator.geolocation  = {
                getCurrentPosition: function () {
                    // Do nothing...
                    return;
                }
            };
        }
        fakePosition = { coords: { latitude: 22.12121212, longitude: 33.32112321 }};
    }));

    describe(' - broadcastEvent()', function() {

        it(' - Given "idle" event, should broadcast with map\'s model', function() {
            var onMapIdle = jasmine.createSpy('onMapIdle');
            scope.$on('map:idle',  function (event, data) {
                onMapIdle(data);
            });
            Map.broadcastEvent(null, 'idle');
            expect(onMapIdle).toHaveBeenCalledWith(Map.map);
        });

        it(' - Given "click" event, should broadcast with clicked location', function() {
            var onMapClick = jasmine.createSpy('onMapClick');
            scope.$on('map:click',  function (event, data) {
                onMapClick(data);
            });
            var location = {
                latitude: 23.456789,
                longitude: 135.797531
            };
            Map.broadcastEvent(null, 'click', [{
                latLng: {
                    lat: function () {
                        return location.latitude;
                    },
                    lng: function () {
                        return location.longitude;
                    }
                }
            }]);
            expect(onMapClick).toHaveBeenCalledWith(location);
        });
    });

    describe(' - saveMap()', function() {
        it(' - Should save current map model into local storage', function() {
            localStorage.remove('test-map');
            Map.saveMap('test-map');
            var testMap = localStorage.get('test-map');
            expect(testMap).toEqual(Map.map);
        });
    });

    describe(' - saveHomeMap()', function() {
        it(' - Should pop a confirm dialog to save home-map', function() {
            spyOn(Map, 'saveMap');
            Map.saveHomeMap();
            expect(Dialog.confirm).toHaveBeenCalled();
            $rootScope.$digest();
            expect(Map.saveMap).toHaveBeenCalledWith('home-map');
        });
    });

    describe(' - setInitMapScheme()', function() {
        it(' - Should save init map scheme, whatever it is, to local storage', function() {
            var initMapScheme = 54088;
            Map.setInitMapScheme(initMapScheme);
            expect(localStorage.get('init-map-scheme')).toBe(initMapScheme);
        });

        describe(' - LAST', function() {
            beforeEach(function() {
                spyOn(Map, 'saveMap');
                Map.setInitMapScheme(Map.INIT_MAP_SCHEMES.LAST);
            });

            it(' - Should call saveMap() to save last-map into local storage', function() {
                expect(Map.saveMap).toHaveBeenCalledWith('last-map');
            });

            it(' - Should save last-map whenever map is changed', function() {
                $rootScope.$broadcast('map:idle', Map.map);
                $timeout.flush();
                expect(Map.saveMap.calls.count()).toBe(2);
            });
        });

        describe(' - HOME_MAP', function() {
            it(' - Should call saveHomeMap() if it\'s not in local storage yet', function() {
                localStorage.remove('home-map');
                spyOn(Map, 'saveHomeMap');
                Map.setInitMapScheme(Map.INIT_MAP_SCHEMES.HOME_MAP);
                expect(Map.saveHomeMap).toHaveBeenCalled();
            });
        });
    });

    describe(' - prmsGotoGeolocation()', function() {    
        it(' - Should update map model with geolocation result', function() {
            Map.prmsGotoGeolocation();
            $rootScope.$digest();
            expect(Map.map.center).toEqual(fakePosition.coords);
            expect(Map.map.zoom).toEqual(Map.ZOOMS.STREET);
        });
    });

    describe(' - prmsGetInitMap()', function() {
        it(' - Should return resolved map model', function() {
            var successFunc = jasmine.createSpy('successFunc');
            Map.prmsGetInitMap().then(successFunc);
            $rootScope.$digest();
            expect(successFunc).toHaveBeenCalledWith(Map.map);
        });

        describe(' - GEOLOCATION', function() {
            it(' - Should call prmsGotoGeolocation()', function() {
                localStorage.set('init-map-scheme', Map.INIT_MAP_SCHEMES.GEOLOCATION);
                spyOn(Map, 'prmsGotoGeolocation').and.callThrough();
                Map.prmsGetInitMap();
                $rootScope.$digest();
                expect(Map.prmsGotoGeolocation).toHaveBeenCalled();
            });
        });

        describe(' - LAST', function() {
            var fakeLastMap;
            beforeEach(function() {
                localStorage.set('init-map-scheme', Map.INIT_MAP_SCHEMES.LAST);
                fakeLastMap = {
                    center: {latitude: 23.45678, longitude: 123.45678},
                    zoom: 255
                };
                localStorage.set('last-map', fakeLastMap);
            });

            it(' - Should activate saving last-map', function() {
                spyOn(Map, 'saveMap');
                Map.prmsGetInitMap();
                $rootScope.$digest();
                $rootScope.$broadcast('map:idle', Map.map);
                $timeout.flush();
                expect(Map.saveMap).toHaveBeenCalledWith('last-map');
            });

            it(' - Should extend map model with "last-map" in localStorage', function () {
                Map.prmsGetInitMap();
                $rootScope.$digest();
                for(var key in fakeLastMap){
                    expect(Map.map[key]).toEqual(fakeLastMap[key]);
                }
            });
        });

        describe(' - HOME_MAP', function() {
            var fakeHomeMap;
            beforeEach(function() {
                localStorage.set('init-map-scheme', Map.INIT_MAP_SCHEMES.HOME_MAP);
                fakeHomeMap = {
                    center: {latitude: 23.45678, longitude: 123.45678},
                    zoom: 128
                };
                localStorage.set('home-map', fakeHomeMap);
            });

            it(' - Should extend map model with "home-map" in localStorage', function () {
                Map.prmsGetInitMap();
                $rootScope.$digest();
                for(var key in fakeHomeMap){
                    expect(Map.map[key]).toEqual(fakeHomeMap[key]);
                }
            });
        });
    });

    describe(' - navigateTo()', function() {
        var location;
        beforeEach(function() {
            location = {
                latitude: 78.787878,
                longitude: 99.999999
            }
        });
        
        it(' - Should set Map.map.center to location\'s coordinate', function() {
            Map.navigateTo(location);
            expect(Map.map.center.latitude).toBe(location.latitude);
            expect(Map.map.center.longitude).toBe(location.longitude);
        });

        it(' - Should set zoom if given zoom in location', function() {
            location.zoom = 10;
            Map.navigateTo(location);
            expect(Map.map.zoom).toBe(location.zoom);
        });

        it(' - Should set map bounds if given viewport in location', function() {
            location.viewport = {
                southeast: {
                    latitude: 11.111111,
                    longitude: 111.111111
                },
                northwest: {
                    latitude: 66.666666,
                    longitude: 166.666666
                }
            };
            Map.navigateTo(location);
            expect(Map.map.bounds).toEqual(location.viewport);
        });
    });
});

'use strict';
        
describe('Map', function () {
    beforeEach(module('spirit99'));

    // Mock dependencies
    beforeEach(function() {
        module(function($provide) {
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
    });

    var Map, localStorage, $rootScope, $timeout, scope, Dialog, $q, $window;
    var fakePosition;
    beforeEach(inject(function (_Map_, _$rootScope_, _$timeout_, _Dialog_, localStorageService, _$q_, _$window_) {
        Map = _Map_;
        localStorage = localStorageService;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        scope = $rootScope.$new();
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
        fakePosition = { coords: { latitude: 22.2222222, longitude: 33.3333333 }};
        spyOn($window.navigator.geolocation, 'getCurrentPosition')
        .and.callFake(function () {
            return arguments[0](fakePosition);
        });      
    }));

    describe(' - broadcastEvent()', function() {
        var eventData;
        beforeEach(function() {
            scope.$on('map:test', function (event, data) {
                eventData = data;
            });
            Map.broadcastEvent(null, 'test');
        });

        it(' - Should receive event and map\'s model', function() {
            expect(eventData).toEqual(Map.map);
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
            expect($window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
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
});

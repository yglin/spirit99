(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Map', Map);

    Map.$inject = ['$q', '$log', '$rootScope', '$timeout', '$window', '$routeParams', 'localStorageService', 'Dialog', 'Geolocation'];

    /* @ngInject */
    function Map($q, $log, $rootScope, $timeout, $window, $routeParams, localStorage, Dialog, Geolocation) {
        var self = this;
        // Properties
        self.ZOOMS = ZOOMS();
        self.INIT_MAP_SCHEMES = INIT_MAP_SCHEMES();
        self.map = defaultMap();
        self.initMapScheme = localStorage.get('init-map-scheme');
        self.initReady = $q.defer();
        
        // Member functions
        self.broadcastEvent = broadcastEvent;
        self.saveMap = saveMap;
        self.saveHomeMap = saveHomeMap;
        self.setInitMapScheme = setInitMapScheme;
        self.prmsGotoGeolocation = prmsGotoGeolocation;
        self.prmsGetInitMap = prmsGetInitMap;
        self.getBounds = getBounds;
        self.navigateTo = navigateTo;

        ////////////////
        activate();

        function activate () {
            if (!self.initMapScheme) {
                self.setInitMapScheme(self.INIT_MAP_SCHEMES.GEOLOCATION);
            }

            var removeListenerForInitReady = $rootScope.$on('map:idle', function () {
                self.initReady.resolve();
                removeListenerForInitReady();
            });
        }
        
        function broadcastEvent (gMapObj, event, mouseEvents) {
            if (event == 'idle') {
                $rootScope.$broadcast('map:' + event, self.map);
            }
            else if (event == 'click') {
                var location = {};
                location.latitude = mouseEvents[0].latLng.lat();
                location.longitude = mouseEvents[0].latLng.lng();
                $rootScope.$broadcast('map:' + event, location);                
            }
            else {
                $rootScope.$broadcast('map:' + event);
            }
        }

        function setInitMapScheme (scheme) {
            // $log.debug(scheme);
            self.initMapScheme = scheme;
            localStorage.set('init-map-scheme', self.initMapScheme);
            
            if(scheme == self.INIT_MAP_SCHEMES.LAST){
                self.saveMap('last-map');
                activateSavingLastMap();
            }
            else if(typeof self.unbindHandlerSaveMap === 'function'){
                self.unbindHandlerSaveMap();
            }

            if(scheme == self.INIT_MAP_SCHEMES.HOME_MAP && !localStorage.get('home-map')){
                self.saveHomeMap();
            }
        }

        function saveHomeMap (){
            var title = '設定地圖首頁';
            var desc = '<p>將目前所瀏覽的地圖範圍，設定為每次開啟網站時顯示的地圖？</p>';
            if(!localStorage.get('home-map')){
                desc = '<h5>您尚未設定地圖首頁...</h5>' + desc;
            }
            Dialog.confirm(title, desc)
            .then(function () {
                self.saveMap('home-map');
            });
        }

        function saveMap (key) {
            // console.debug('Save map - ' + key + ' ~!!');
            localStorage.set(key, self.map);
        }

        function activateSavingLastMap () {
            // Save map whenever map view is changed
            if(typeof self.unbindHandlerSaveMap === 'function'){
                self.unbindHandlerSaveMap();
            }
            self.unbindHandlerSaveMap = $rootScope.$on('map:idle',
            function (event, data) {
                // Wait until map data is update(After Angular digest cycle complete)
                $timeout(function () {
                    self.saveMap('last-map');
                }, 0, false);
            });            
        }

        function prmsGotoGeolocation () {
            return Geolocation.prmsGetCurrentPosition()
            .then(function (position) {
                self.navigateTo({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    zoom: self.ZOOMS.STREET
                });
                return $q.resolve();
            });
        }

        function prmsGetInitMap() {
            // Get init-map-scheme from local storage
            var initMapScheme = localStorage.get('init-map-scheme');
            self.initMapScheme = initMapScheme ? initMapScheme : self.initMapScheme;
            if(self.initMapScheme == self.INIT_MAP_SCHEMES.LAST){
                activateSavingLastMap();
            }
            var lastMap = localStorage.get('last-map');
            var homeMap = localStorage.get('home-map');

            var done = $q.defer();

            // Resolve initMap from query parameter
            if ($routeParams.map) {
                var map = JSON.parse($routeParams.map);
                console.log(map);
                self.map.center.latitude = map.center.latitude;
                self.map.center.longitude = map.center.longitude;
                if (map.zoom) {
                    self.map.zoom = map.zoom;
                }
                console.log(self.map);
                done.resolve(self.map);
            }
            // Resolve initMap from geolocation
            else if(self.initMapScheme === self.INIT_MAP_SCHEMES.GEOLOCATION){
                self.prmsGotoGeolocation()
                .catch(function (error) {
                    var confirmMessage = '是否要關閉網站開啟時的自動定位功能？<br>（可以在選單<i class="material-icons">more_vert</i><i class="material-icons">keyboard_arrow_right</i>設定<i class="material-icons">settings</i>中重新打開）';
                    Dialog.confirm('關閉自動定位', confirmMessage,
                        {
                            buttons: {
                                confirm: '關閉定位',
                                cancel: '維持自動定位'
                            }
                        })
                    .then(function () {
                        self.setInitMapScheme(self.INIT_MAP_SCHEMES.LAST);
                    });                    
                })
                .finally(function () {
                    done.resolve(self.map);
                });
            }
            // Resolve initMap from last one
            else if(self.initMapScheme === self.INIT_MAP_SCHEMES.LAST && lastMap){
                angular.extend(self.map, lastMap);
                done.resolve(self.map);
            }
            // Resolve initMap from homeMap
            else if(self.initMapScheme === self.INIT_MAP_SCHEMES.HOME_MAP && homeMap){
                angular.extend(self.map, homeMap);
                done.resolve(self.map);
            }
            else{
                done.resolve(self.map);
            }

            return done.promise;
        }

        function getBounds () {
            return self.map.bounds;
        }

        function navigateTo (location, options) {
            options = typeof options === 'undefined' ? {} : options;

            self.map.center.latitude = location.latitude;
            self.map.center.longitude = location.longitude;
            if (location.zoom) {
                self.map.zoom = location.zoom;
            }
            if (location.viewport) {
                self.map.bounds = location.viewport;
            }

            $rootScope.$broadcast('map:navigate', location);
        }

        //////////////////// Functions for initialize CONSTANTS
        
        function ZOOMS () {
            return {
                STREET: 15,
                TAIWAN: 7
            };
        }

        function INIT_MAP_SCHEMES () {
            return {
                GEOLOCATION: 1,
                LAST: 2,
                HOME_MAP: 3
            };
        }

        function defaultMap () {
            // An overview of Taiwan
            return {
                center: { latitude: 23.973875, longitude: 120.982024 },
                zoom: ZOOMS().STREET,
                bounds: {
                    southwest: {latitude: 21.117985, longitude: 115.2966},
                    northeast: {latitude: 26.767849, longitude: 126.667449}
                }
            };
        }
    }
})();
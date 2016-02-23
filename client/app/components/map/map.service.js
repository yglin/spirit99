(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Map', Map);

    Map.$inject = ['$q', '$log', '$rootScope', '$timeout', '$window', 'localStorageService', 'Dialog'];

    /* @ngInject */
    function Map($q, $log, $rootScope, $timeout, $window, localStorage, Dialog) {
        var self = this;
        // Properties
        self.ZOOMS = ZOOMS();
        self.INIT_MAP_SCHEMES = INIT_MAP_SCHEMES();
        self.map = defaultMap();
        self.initMapScheme = self.INIT_MAP_SCHEMES.GEOLOCATION;
        // Member functions
        self.broadcastEvent = broadcastEvent;
        self.saveMap = saveMap;
        self.saveHomeMap = saveHomeMap;
        self.setInitMapScheme = setInitMapScheme;
        self.prmsGotoGeolocation = prmsGotoGeolocation;
        self.prmsGetInitMap = prmsGetInitMap;

        ////////////////
        
        function broadcastEvent (gMapObj, event) {
            $rootScope.$broadcast('map:' + event, self.map);
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

        function prmsGetGeolocation () {
            var deferred = $q.defer();
            if($window.navigator && $window.navigator.geolocation){
                $window.navigator.geolocation.getCurrentPosition(
                function(position){
                    deferred.resolve(position);
                },
                function (error) {
                    $log.warn(error);
                    deferred.reject(error);
                });
            }
            else{
                $log.warn('Browser not support geolocation');
                deferred.reject('Browser not support geolocation');
            }
            return deferred.promise;
        }

        function prmsGotoGeolocation () {
            return prmsGetGeolocation().then(function (position) {
                self.map.center = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                self.map.zoom = self.ZOOMS.STREET;
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
            
            // Resolve initMap from geolocation
            if(self.initMapScheme === self.INIT_MAP_SCHEMES.GEOLOCATION){
                return self.prmsGotoGeolocation().then(function () {
                    return $q.resolve(self.map);
                });
            }
            // Resolve initMap from last one
            else if(self.initMapScheme === self.INIT_MAP_SCHEMES.LAST && lastMap){
                angular.extend(self.map, lastMap);
                return $q.resolve(self.map);
            }
            // Resolve initMap from homeMap
            else if(self.initMapScheme === self.INIT_MAP_SCHEMES.HOME_MAP && homeMap){
                angular.extend(self.map, homeMap);
                return $q.resolve(self.map);
            }
            else{
                return $q.resolve(self.map);
            }
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
                zoom: ZOOMS().TAIWAN,
                bounds: {
                    southwest: {latitude: 0, longitude: 0},
                    northeast: {latitude: 0, longitude: 0}
                }
            };
        }
    }
})();
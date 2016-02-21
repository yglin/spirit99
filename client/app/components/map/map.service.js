(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Map', Map);

    Map.$inject = ['$q', '$log', '$rootScope', '$timeout', 'localStorageService', 'DEFAULTS', 'MAP_ZOOM', 'INIT_MAP_SCHEMES'];

    /* @ngInject */
    function Map($q, $log, $rootScope, $timeout, localStorage, DEFAULTS, MAP_ZOOM, INIT_MAP_SCHEMES) {
        var self = this;
        self.map = angular.copy(DEFAULTS.map);
        self.initMapScheme = INIT_MAP_SCHEMES.GEOLOCATION;
        self.setInitMapScheme = setInitMapScheme;
        self.saveMap = saveMap;
        self.prmsInitMap = prmsInitMap;

        activate();

        ////////////////
        

        function activate () {
            var initMapScheme = localStorage.get('init-map-scheme');
            self.initMapScheme = initMapScheme ? initMapScheme : self.initMapScheme;
            if(self.initMapScheme == INIT_MAP_SCHEMES.LAST){
                activaSavingLastMap();
            }
        }

        function setInitMapScheme (scheme) {
            $log.debug(scheme);
            self.initMapScheme = scheme;
            localStorage.set('init-map-scheme', self.initMapScheme);
            if(scheme == INIT_MAP_SCHEMES.LAST){
                self.saveMap('last-map');
                activaSavingLastMap();
            }
            else if(typeof self.unbindHandlerSaveMap === 'function'){
                self.unbindHandlerSaveMap();
            }
        }

        function saveMap (key) {
            localStorage.set(key, self.map);
        }

        function activaSavingLastMap () {
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

        function prmsInitMap() {
            // Get init-map-scheme from local storage
            var lastMap = localStorage.get('last-map');
            var homeMap = localStorage.get('home-map');
            
            // Resolve initMap from geolocation
            if(self.initMapScheme === INIT_MAP_SCHEMES.GEOLOCATION){
                var deferred = $q.defer();
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(
                    function(position){
                        self.map.center = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        self.map.zoom = MAP_ZOOM.STREET
                        deferred.resolve();
                    },
                    function (error) {
                        $log.debug(error);
                        deferred.resolve(self.map);  
                    });
                }
                else{
                    $log.error('Browser not support geolocation');
                    deferred.resolve(self.map);  
                }
                return deferred.promise;
            }
            // Resolve initMap from last one
            else if(self.initMapScheme === INIT_MAP_SCHEMES.LAST && lastMap){
                angular.extend(self.map, lastMap);
                return $q.resolve(self.map);
            }
            // Resolve initMap from homeMap
            else if(self.initMapScheme === INIT_MAP_SCHEMES.HOME_MAP && homeMap){
                angular.extend(self.map, homeMap);
                return $q.resolve(self.map);
            }
            else{
                return $q.resolve(self.map);
            }
        }
    }
})();
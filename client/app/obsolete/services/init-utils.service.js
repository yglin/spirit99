(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('initUtils', initUtils);

    initUtils.$inject = ['$q', 'MapNavigator', 'DEFAULTS', 'PRESETS'];

    /* @ngInject */
    function initUtils($q, MapNavigator, DEFAULTS, PRESETS) {
        var self = this;
        // Enums
        self.INIT_MAP_AS_GEOLOCATION = 1;

        // Methods
        self.promiseGetInitMapArea = promiseGetInitMapArea;

        ////////////////

        function promiseGetInitMapArea (initMapScheme) {
            if(initMapScheme === self.INIT_MAP_AS_GEOLOCATION){
                return MapNavigator.getUserGeolocation().then(function (userLocation) {
                    return $q.resolve({
                        center: userLocation,
                        zoom: PRESETS.zoomLevels.STREET
                    });
                }, function (error) {
                    return $q.resolve(DEFAULTS.map);
                });
            }
            else{
                return $q.resolve(DEFAULTS.map);
            }
        }
    }
})();


(function() {
    'use strict';

    angular
    .module('spirit99')
    .constant('MAP_ZOOM', MAP_ZOOM())
    .constant('INIT_MAP_SCHEMES', INIT_MAP_SCHEMES());

    function MAP_ZOOM() {
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

})();
(function() {
    'use strict';

    var ZOOM_LEVELS = {
        STREET: 15,
        TAIWAN: 7
    };

    angular
    .module('spirit99')
    .constant('ZOOM_LEVELS', zoomLevelsProvider())
    .constant('DEFAULTS', defaultsProvider());

    function zoomLevelsProvider () {
        return ZOOM_LEVELS;
    }

    function defaultsProvider() {
        return {
            map: {
                center: { latitude: 23.973875, longitude: 120.982024 },
                zoom: ZOOM_LEVELS.TAIWAN,
                bounds: {}
            }
        };
    }

})();
(function() {
    'use strict';

    angular
    .module('spirit99')
    .constant('MAP_ZOOM', MAP_ZOOM());

    function MAP_ZOOM() {
        return {
            STREET: 15,
            TAIWAN: 7
        };
    }

})();
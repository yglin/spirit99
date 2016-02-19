(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('MapNavigator', MapNavigator);

    MapNavigator.$inject = ['$q', 'DEFAULTS'];

    /* @ngInject */
    function MapNavigator($q, DEFAULTS) {
        var self = this;
        self.getUserGeolocation = getUserGeolocation;

        ////////////////

        // TODO: Implement 
        function getUserGeolocation() {
            return $q.resolve(DEFAULTS.map.center);
        }
    }
})();
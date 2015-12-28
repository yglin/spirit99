(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('StationManager', StationManager);

    StationManager.$inject = [];

    /* @ngInject */
    function StationManager() {
        var self = this;
        self.getResourceMeta = getResourceMeta;

        ////////////////

        // TODO: Implement
        function getResourceMeta(stationName, resourceName) {
            return {};
        }
    }
})();
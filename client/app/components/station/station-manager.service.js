(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('StationManager', StationManager);

    StationManager.$inject = [];

    /* @ngInject */
    function StationManager() {
        var self = this;
        self.getTitle = getTitle;
        self.getResourceMeta = getResourceMeta;

        ////////////////
        // TODO: Implement
        function getTitle(stationID){
            return '核廢料掩埋場';
        }

        // TODO: Implement
        function getResourceMeta(stationName, resourceName) {
            return {};
        }
    }
})();
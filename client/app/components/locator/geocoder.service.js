(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Geocoder', Geocoder);

    Geocoder.$inject = [];

    /* @ngInject */
    function Geocoder() {
        var self = this;
        self.geocode = geocode;

        ////////////////

        function geocode() {
        }
    }
})();

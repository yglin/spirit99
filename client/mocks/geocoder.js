module.exports.addMockGeocoder = addMockGeocoder;

function addMockGeocoder (fakePositions) {
    angular.module('spirit99')
    .service('Geocoder', ['$q', function ($q) {
        var self = this;
        self.prmsGeocode = prmsGeocode;

        function prmsGeocode () {
            return $q.resolve(fakePositions);
        }
    }]);
}

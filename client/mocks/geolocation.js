// module.exports = {
//     mockGeoLocationSuccess: function(lat, lon) {
//         return 'window.navigator.geolocation.getCurrentPosition = ' +
//             '       function (success, error) {' +
//             '         success({' +
//             '           "coords" : {' +
//             '             "latitude": "' + lat + '",' +
//             '             "longitude": "' + lon + '"' +
//             '           }' +
//             '       });' +
//             '     }';
//     },

//     mockGeoLocationError: function(code) {
//         return 'window.navigator.geolocation.getCurrentPosition = ' +
//                 '     function (success, error) {' +
//                 '       error({' +
//                 '         code: ' + code + ',' +
//                 '         PERMISSION_DENIED: 1,' +
//                 '         POSITION_UNAVAILABLE: 2,' +
//                 '         TIMEOUT: 3' +
//                 '       });' +
//                 '     }';
//     }
// };

module.exports = {
    Geolocation: function ($q) {
        var self = this;
        self.prmsGetCurrentPosition = prmsGetCurrentPosition;

        function prmsGetCurrentPosition () {
            return $q.resolve();
        }
    }
};

module.exports.addMockGeolocation = addMockGeolocation;

function addMockGeolocation (fakePosition) {
    angular.module('spirit99')
    .service('Geolocation', ['$q', function ($q) {
        var self = this;
        self.prmsGetCurrentPosition = prmsGetCurrentPosition;

        function prmsGetCurrentPosition () {
            return $q.resolve(fakePosition);
        }
    }]);
}


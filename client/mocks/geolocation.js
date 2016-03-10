module.exports = {
    mockGeoLocationSuccess: function(lat, lon) {
        return 'window.navigator.geolocation.getCurrentPosition = ' +
            '       function (success, error) {' +
            '         success({' +
            '           "coords" : {' +
            '             "latitude": "' + lat + '",' +
            '             "longitude": "' + lon + '"' +
            '           }' +
            '       });' +
            '     }';
    },

    mockGeoLocationError: function(code) {
        return 'window.navigator.geolocation.getCurrentPosition = ' +
                '     function (success, error) {' +
                '       error({' +
                '         code: ' + code + ',' +
                '         PERMISSION_DENIED: 1,' +
                '         POSITION_UNAVAILABLE: 2,' +
                '         TIMEOUT: 3' +
                '       });' +
                '     }';
    }
};

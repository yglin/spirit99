(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Geocoder', Geocoder);

    Geocoder.$inject = ['$q', 'uiGmapGoogleMapApi', 'Dialog'];

    /* @ngInject */
    function Geocoder($q, uiGmapGoogleMapApi, Dialog) {
        var self = this;
        self.googlemapsApi = null;
        self.geocoder = null;
        self.prmsGeocode = prmsGeocode;

        activate();

        ////////////////
        function activate () {
            uiGmapGoogleMapApi.then(function (googlemapsApi) {
                self.googlemapsApi = googlemapsApi;
            });
        }

        function prmsGeocode(address) {
            if (!self.googlemapsApi) {
                Dialog.alert('定位失敗', '目前無法使用 Google Geocoder');
                return $q.reject();
            }
            else {
                var defer = $q.defer();
                if (!self.geocoder) {
                    self.geocoder = new self.googlemapsApi.Geocoder();
                }
                self.geocoder.geocode({address: address}, function (results, status) {
                    if (status === self.googlemapsApi.GeocoderStatus.OK) {
                        var locations = [];
                        for (var i = 0; i < results.length; i++) {
                            locations.push({
                                latitude: results[i].geometry.location.lat(),
                                longitude: results[i].geometry.location.lng(),
                                address: results[i].formatted_address,
                                viewport: {
                                    southwest: {
                                        latitude: results[i].geometry.viewport.getSouthWest().lat(),
                                        longitude: results[i].geometry.viewport.getSouthWest().lng()
                                    },
                                    northeast: {
                                        latitude: results[i].geometry.viewport.getNorthEast().lat(),
                                        longitude: results[i].geometry.viewport.getNorthEast().lng()                                
                                    }
                                }
                            });
                        }
                        defer.resolve(locations);
                    }
                    else {
                        var error = {
                            status: status,
                            message: results.error_message ? results.error_message : 'Google geocode failed, status code = ' + status
                        };
                        defer.reject(error);
                    }
                })
                return defer.promise;
            }

        }
    }
})();

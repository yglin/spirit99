(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Locator', Locator);

    Locator.$inject = ['$q', '$rootScope', '$mdDialog', 'Map', 'Geolocation', 'Geocoder', 'localStorageService'];

    /* @ngInject */
    function Locator($q, $rootScope, $mdDialog, Map, Geolocation, Geocoder, localStorage) {
        var self = this;
        self.locationQueries = localStorage.get('location-queries');
        // self.locations = [];
        // self.locationIndex = 0;

        self.openDialog = openDialog;
        // self.prmsLocate = prmsLocate;
        self.geocode = geocode;
        self.addQueryHistory = addQueryHistory;
        // self.toNextLocation = toNextLocation;

        activate();

        ////////////////
        
        function activate () {
            if (!self.locationQueries) {
                self.locationQueries = [];
            }
        }

        function openDialog() {
            return $mdDialog.show({
                controller: 'LocatorController',
                templateUrl: 'app/components/map/locator/locator.tpl.html',
                parent: angular.element(document.body),
                controllerAs: 'locatorVM',
                bindToController: true,
                clickOutsideToClose:true,
                locals: {}
            }).then(function (location) {
                Map.navigateTo(location);
                $rootScope.$broadcast('map:geocode', location);
            });
        }

        function addQueryHistory (title, address) {
            for (var i = 0; i < self.locationQueries.length; i++) {
                if (title == self.locationQueries[i].title) {
                     // Already in history, cancel
                     return;
                }
            }

            self.locationQueries.push({
                title: title,
                address: address
            });
            while (self.locationQueries.length > 10) {
                self.locationQueries.shift();
            }
            localStorage.set('location-queries', self.locationQueries);            
        }

        function geocode(query) {
            if (query == '您的位置' || query == 'My Location') {
                return Geolocation.prmsGetCurrentPosition()
                .then(function (position) {
                    return $q.resolve([{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zoom: Map.ZOOMS.STREET
                    }]);
                });
            }
            else {
                return Geocoder.prmsGeocode(query)
                .then(function (results) {
                    var locations = [];
                    for (var i = 0; i < results.length; i++) {
                        locations.push.apply(locations, results);
                    }
                    self.addQueryHistory(query, results[0].address)
                    return $q.resolve(locations);
                });
            }
        }

        // function prmsLocate (query) {
        //     self.locations.length = 0;
        //     self.locationIndex = 0;
        //     var defer = $q.defer();
            
        //     $rootScope.$broadcast('progress:start');
        //     if (typeof self.unbindOnMapIdleProgressEnd == 'function') {
        //         self.unbindOnMapIdleProgressEnd();
        //     }
        //     self.unbindOnMapIdleProgressEnd = $rootScope.$on('map:idle', function () {
        //         $rootScope.$broadcast('progress:end');
        //         self.unbindOnMapIdleProgressEnd();
        //     });
            
        //     // if (query == '您的位置' || query == 'My Location') {
        //     //     Geolocation.prmsGetCurrentPosition()
        //     //     .then(function (position) {
        //     //         self.locations.push({
        //     //             latitude: position.coords.latitude,
        //     //             longitude: position.coords.longitude,
        //     //             zoom: Map.ZOOMS.STREET
        //     //         });
        //     //         defer.resolve();
        //     //     });
        //     // }
        //     // else {
        //     //     Geocoder.prmsGeocode(query)
        //     //     .then(function (results) {
        //     //         for (var i = 0; i < results.length; i++) {
        //     //             self.locations.push.apply(self.locations, results);
        //     //         }
        //     //         self.addQueryHistory(query, results[0].address)
        //     //         defer.resolve();
        //     //     });
        //     // }
        //     // defer.promise.then(function () {
        //     //     self.toNextLocation();
        //     // });
        //     self.geocode(query)
        //     .then(function (locations) {
        //         self.locations.length = 0;
        //         angular.extend(self.locations, locations);
        //     });
        // }

        // function toNextLocation () {
        //     Map.navigateTo(self.locations[self.locationIndex]);
        //     self.locationIndex = (self.locationIndex + 1) % self.locations.length;
        // }
    }
})();

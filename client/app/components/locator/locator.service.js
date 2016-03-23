(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Locator', Locator);

    Locator.$inject = ['$q', '$mdDialog', 'Map', 'Geolocation', 'Geocoder', 'localStorageService'];

    /* @ngInject */
    function Locator($q, $mdDialog, Map, Geolocation, Geocoder, localStorage) {
        var self = this;
        self.locationQueries = localStorage.get('location-queries');
        self.locations = [];
        self.locationIndex = 0;
        self.openDialog = openDialog;
        self.prmsLocate = prmsLocate;
        self.addQueryHistory = addQueryHistory;
        self.toNextLocation = toNextLocation;

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
                templateUrl: 'app/components/locator/locator.tpl.html',
                parent: angular.element(document.body),
                controllerAs: 'locatorVM',
                bindToController: true,
                clickOutsideToClose:true,
                locals: {}
            }).then(function (address) {
                self.prmsLocate(address);
            });
        }

        function addQueryHistory (title, address) {
            self.locationQueries.push({
                title: title,
                address: address
            });
            while (self.locationQueries.length > 10) {
                self.locationQueries.shift();
            }
            localStorage.set('location-queries', self.locationQueries);            
        }

        function prmsLocate (query) {
            self.locations.length = 0;
            self.locationIndex = 0;
            var defer = $q.defer();
            if (query == '您的位置' || query == 'My Location') {
                Geolocation.prmsGetCurrentPosition()
                .then(function (position) {
                    self.locations.push({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zoom: Map.ZOOMS.STREET
                    });
                    defer.resolve();
                });
            }
            else {
                Geocoder.prmsGeocode(query)
                .then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        self.locations.push.apply(self.locations, results);
                    }
                    self.addQueryHistory(query, results[0].address)
                    defer.resolve();
                });
            }
            defer.promise.then(function () {
                self.toNextLocation();
            });
        }

        function toNextLocation () {
            Map.navigateTo(self.locations[self.locationIndex]);
            self.locationIndex = (self.locationIndex + 1) % self.locations.length;
        }
    }
})();

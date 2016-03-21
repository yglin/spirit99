(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Locator', Locator);

    Locator.$inject = ['$q', '$mdDialog', 'Map', 'Geolocation'];

    /* @ngInject */
    function Locator($q, $mdDialog, Map, Geolocation) {
        var self = this;
        self.openDialog = openDialog;
        self.locations = [];
        self.prmsLocate = prmsLocate;

        ////////////////

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

        function prmsLocate (address) {
            self.locations.length = 0;
            var defer = $q.defer();
            if (address == '您的位置' || address == 'My Location') {
                Geolocation.prmsGetCurrentPosition()
                .then(function (position) {
                    self.locations.push({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    defer.resolve();
                });
            }
            // else {
            //     Geocoder.geocode(address)
            //     .then(function (results) {
            //         for (var i = 0; i < results.length; i++) {
            //             self.locations.push({
            //                 latitude: results[i].geometry.location.lat(),
            //                 longitude: results[i].geometry.location.lng()
            //             });
            //         }
            //     });
            // }
            defer.promise.then(function () {
                Map.navigateTo(self.locations[0]);
            });
        }
    }
})();

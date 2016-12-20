(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('LocatorController',LocatorController);

    LocatorController.$inject = ['$q', '$mdDialog', 'Locator'];

    /* @ngInject */
    function LocatorController($q, $mdDialog, Locator) {
        var locatorVM = this;
        locatorVM.title = 'Locator';
        locatorVM.inputCtrl = {
            querySearch: searchLocations
        };
        locatorVM.geocodeResults = [];
        locatorVM.geocodeResult = {
            latitude: 0.0,
            longitude: 0.0,
            zoom: 15
        };

        locatorVM.geocode = geocode;
        locatorVM.nextResult = nextResult;
        locatorVM.prevResult = prevResult;
        locatorVM.cancel = cancel;
        locatorVM.confirm = confirm;


        activate();

        ////////////////

        function activate() {
            locatorVM.locationQueries = locatorVM.locationQueries || [];
            locatorVM.locationQueries.unshift({
                title: '您的位置',
                icon: 'my_location'
            });
        }

        function cancel () {
            $mdDialog.cancel();
        }

        function confirm () {
            $mdDialog.hide(locatorVM.geocodeResult);
        }

        function searchLocations (searchText) {
            if(!searchText){
                return [{
                    title: '您的位置',
                    icon: 'my_location'
                }].concat(Locator.locationQueries);
            }
            else{
                return Locator.locationQueries.filter(function (location) {
                    var lcSearchText = angular.lowercase(searchText);
                    return (location.title && location.title.indexOf(lcSearchText) >= 0) || (location.address && location.address.indexOf(lcSearchText) >= 0);
                });
            }
        }

        function geocode() {
            locatorVM.isGeocoding = true;
            locatorVM.errorMessage = null;
            Locator.geocode(locatorVM.inputCtrl.searchText)
            .then(function (locations) {
                if (locations.length > 0) {
                    locatorVM.geocodeResults.length = 0;
                    angular.extend(locatorVM.geocodeResults, locations);
                    angular.extend(locatorVM.geocodeResult, locatorVM.geocodeResults[0]);
                    locatorVM.resultIndex = 0;
                }
            })
            .catch(function (error) {
                console.warn(error);
                locatorVM.errorMessage = error.message;
            })
            .finally(function () {
                locatorVM.isGeocoding = false;
            });
        }

        function nextResult() {
            locatorVM.resultIndex = (locatorVM.resultIndex + 1) % locatorVM.geocodeResults.length;
            angular.extend(locatorVM.geocodeResult, locatorVM.geocodeResults[locatorVM.resultIndex]);            
        }

        function prevResult() {
            if (locatorVM.resultIndex === 0) {
                locatorVM.resultIndex = locatorVM.geocodeResults.length - 1;
            }
            else {
                locatorVM.resultIndex = (locatorVM.resultIndex - 1) % locatorVM.geocodeResults.length;
            }
            angular.extend(locatorVM.geocodeResult, locatorVM.geocodeResults[locatorVM.resultIndex]);            
        }
    }
})();

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
        locatorVM.cancel = cancel;
        locatorVM.confirm = confirm;
        locatorVM.inputCtrl = {
            querySearch: searchLocations
        };


        activate();

        ////////////////

        function activate() {
            locatorVM.locationQueries = locatorVM.locationQueries == null ? [] : locatorVM.locationQueries;
            locatorVM.locationQueries.unshift({
                title: '您的位置',
                icon: 'my_location'
            });
        }

        function cancel () {
            $mdDialog.cancel();
        }

        function confirm () {
            $mdDialog.hide(locatorVM.inputCtrl.searchText);
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
                    return (location.title && location.title.indexOf(lcSearchText) >= 0)
                    || (location.address && location.address.indexOf(lcSearchText) >= 0);
                });
            }
        }
    }
})();

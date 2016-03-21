(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('LocatorController',LocatorController);

    LocatorController.$inject = ['$q', '$mdDialog', 'localStorageService'];

    /* @ngInject */
    function LocatorController($q, $mdDialog, localStorage) {
        var locatorVM = this;
        locatorVM.title = 'Locator';
        locatorVM.addresses = localStorage.get('addresses');
        locatorVM.cancel = cancel;
        locatorVM.confirm = confirm;
        locatorVM.inputCtrl = {
            querySearch: searchLocations
        };


        activate();

        ////////////////

        function activate() {
            locatorVM.addresses = locatorVM.addresses == null ? [] : locatorVM.addresses;
            locatorVM.addresses.unshift({
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
                return locatorVM.addresses;
            }
            else{
                return locatorVM.addresses.filter(function (location) {
                    var lcSearchText = angular.lowercase(searchText);
                    return (location.title && location.title.indexOf(lcSearchText) >= 0)
                    || (location.address && location.address.indexOf(lcSearchText) >= 0);
                });
            }
        }
    }
})();

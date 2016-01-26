(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('LocaterController',LocaterController);

    LocaterController.$inject = ['$scope', '$mdDialog'];

    /* @ngInject */
    function LocaterController($scope, $mdDialog) {
        var locaterVM = this;
        locaterVM.title = 'Locater';
        locaterVM.confirm = confirm;
        locaterVM.cancel = cancel;
        locaterVM.locations = getDefaultLocations().concat(getHistoryLocations());
        locaterVM.inputCtrl = {
            querySearch: searchLocations
        };

        activate();

        ////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function confirm() {
            $mdDialog.hide();
        }

        function searchLocations (searchText) {
            if(!searchText){
                return locaterVM.locations;
            }
            else{
                return locaterVM.locations.filter(function (location) {
                    var lcSearchText = angular.lowercase(searchText);
                    return (location.title && location.title.indexOf(lcSearchText) >= 0)
                    || (location.address && location.address.indexOf(lcSearchText) >=0);
                });
            }
        }

        function getDefaultLocations () {
            return [{
                title: '您的位置',
                icon: 'my_location'
            }];
        }

        function getHistoryLocations () {
            // TODO: Implement
            return [{
                address: '台灣,彰化縣,彰化市,中山路二段644巷17弄9號'
            },
            {
                title: '小英之家',
                address: '台灣,台北市,中正區重慶南路一段122號'
            }];
        }
    }
})();
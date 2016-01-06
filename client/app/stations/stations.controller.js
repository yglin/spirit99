(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('StationsController', StationsController);

    StationsController.$inject = ['$scope', 'StationManager'];

    /* @ngInject */
    function StationsController($scope, StationManager) {
        var stationsVM = this;
        stationsVM.title = 'Stations';
        stationsVM.stations = [];
        stationsVM.showToolbar = false;

        activate();

        ////////////////
        
        // Watch if at least 1 station is checked
        $scope.$watch(function(){
            for (var i = 0; i < stationsVM.stations.length; i++) {
                if(stationsVM.stations[i].isChecked){
                    return true;
                }
            }
            return false;
        }, function (newValue) {
            console.log(newValue);
            if(newValue){
                stationsVM.showToolbar = true;
            }
            else{
                stationsVM.showToolbar = false;
            }
        });

        function activate() {
            stationsVM.stations = StationManager.getStations();
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('StationManager', StationManager);

    StationManager.$inject = ['UserCtrls', 'FakeData'];

    /* @ngInject */
    function StationManager(UserCtrls, FakeData) {
        var self = this;
        self.getStations = getStations;
        self.getStation = getStation;
        self.getResourceMeta = getResourceMeta;

        ////////////////
        function getStation(stationID){
            if(typeof stationID === 'undefined' || !stationID){
                stationID = UserCtrls.selectedStationID;
            }
            var stations = self.getStations();
            if(stationID in stations){
                return stations[stationID];
            }
            else{
                return null
            }
        }

        // TODO: Implement
        function getResourceMeta(stationName, resourceName) {
            return {};
        }

        // TODO: Implement
        function getStations () {
            return FakeData.genFakeStations();
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('StationManager', StationManager);

    StationManager.$inject = ['$q', '$http', 'DEFAULTS', 'UserPrefs', 'UserCtrls', 'FakeData'];

    /* @ngInject */
    function StationManager($q, $http, DEFAULTS, UserPrefs, UserCtrls, FakeData) {
        var self = this;
        self.stations = null;
        self.promiseUpdateStation = promiseUpdateStation;
        self.getStation = getStation;
        self.getStations = getStations;
        self.loadStations = loadStations;
        self.validateStation = validateStation;
        self.tuneInStation = tuneInStation;
        self.getSpiritMeta = getSpiritMeta;

        ////////////////
        function getStation(stationID){
            if(typeof stationID === 'undefined' || !stationID){
                stationID = UserCtrls.tunedInStationID;
            }
            var stations = self.getStations();
            if(stationID in stations){
                return stations[stationID];
            }
            else{
                return null
            }
        }

        function getStations () {
            if(!self.stations){
                self.stations = self.loadStations();
            }
            return self.stations;
        }

        function loadStations () {
            var stations = UserPrefs.get('stations');
            for(var id in stations){
                if(!self.validateStation(stations[id])){
                    delete stations[id];
                }
            }
            return stations;
        }

        function validateStation (station) {
            var required = ['portalUrl', 'id', 'title', 'description'];
            for (var i = 0; i < required.length; i++) {
                if(!(required[i] in station) || !station[required[i]]){
                    console.warn('Station\'s property "' + required[i] + '" is not found');
                    console.warn(station);
                    return false;
                }
            }
            return true;
        }

        function tuneInStation (stationID, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            UserCtrls.tuneInStation(stationID);
        };

        function promiseUpdateStation (stationID, options) {
            options = typeof options === 'undefined' ? {} : options;

            var station = self.getStation(stationID);
            if(!station){
                console.error('Station ' + stationID + ' not exist');
                return $q.reject();
            }
            options.portalUrl = typeof options.portalUrl === 'undefined' ? station.portalUrl : options.portalUrl;

            if(!options.portalUrl){
                console.error('Not found portal url of ' + stationID);
                return $q.reject();
            }
            else{
                station.isUpdating = true;
                return $http.get(options.portalUrl).then(
                function (respond) {
                    angular.extend(station, respond.data);
                    station.portalUrl = options.portalUrl;
                    if(station.id === UserCtrls.tunedInStationID){
                        // if it's currently tuned in station, refresh views by tuning in it again
                        self.tuneInStation(station.id);
                    }
                    // console.debug(station);
                }, function (error) {
                    console.warn(error);
                })
                .finally(function () {
                    station.isUpdating = false;
                });
            }
        };  

        // TODO: Implement
        function getSpiritMeta(stationName, spiritName) {
            return {};
        }

    }
})();
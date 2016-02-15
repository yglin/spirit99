(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserCtrls', UserCtrls);

    UserCtrls.$inject = ['$q', '$rootScope', 'DEFAULTS', 'PRESETS'];

    /* @ngInject */
    function UserCtrls($q, $rootScope, DEFAULTS, PRESETS) {
        var self = this;
        self.tuneInChannel = tuneInChannel;
        self.getSearchPeriod = getSearchPeriod;
        self.getSearchKeywords = getSearchKeywords;
        self.INIT_MAP_AS_GEOLOCATION = 1;
        self.promiseGetInitMapArea = promiseGetInitMapArea;

        activate();

        ////////////////
        function activate () {
            angular.merge(self, DEFAULTS.userCtrls);            
        }

        function tuneInChannel (channelID) {
            self.tunedInChannelID = channelID;
            $rootScope.$broadcast('channel:changed', channelID);
        }

        function getSearchPeriod () {
            if(self.search.create_time.preset in PRESETS.periods){
                return PRESETS.periods[self.search.create_time.preset];
            }
            else{
                return PRESETS.periods['anyTime'];
            }
        }

        function getSearchKeywords () {
            return self.search.keywords;
        }

        function promiseGetInitMapArea (initMapScheme) {
            return self.map;
            // if(initMapScheme === self.INIT_MAP_AS_GEOLOCATION){
            //     return MapNavigator.getUserGeolocation().then(function (userLocation) {
            //         self.map.center = userLocation;
            //         self.map.zoom = PRESETS.zoomLevels.STREET;
            //         return self.map;
            //     }, function (error) {
            //         return $q.resolve(self.map);
            //     });
            // }
            // else{
            //     return $q.resolve(self.map);
            // }
        }

    }
})();
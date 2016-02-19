(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserCtrls', UserCtrls);

    UserCtrls.$inject = ['$q', '$rootScope', 'DEFAULTS', 'PRESETS', 'ChannelManager'];

    /* @ngInject */
    function UserCtrls($q, $rootScope, DEFAULTS, PRESETS, ChannelManager) {
        var self = this;
        self.tuneInChannel = tuneInChannel;
        self.getSearchKeywords = getSearchKeywords;
        self.INIT_MAP_AS_GEOLOCATION = 1;
        self.promiseGetInitMapArea = promiseGetInitMapArea;

        activate();

        ////////////////
        function activate () {
            angular.merge(self, DEFAULTS.userCtrls);
            tuneInChannel(self.tunedInChannelID);
        }

        function tuneInChannel (channelID) {
            if(self.tunedInChannelID != channelID){
                self.tunedInChannelID = channelID;
            }
            self.search.categories = {};
            angular.forEach(ChannelManager.getCategories(channelID),
            function (category, categoryID) {
                self.search.categories[categoryID] = {
                    show: true
                };
            });
            $rootScope.$broadcast('channel:changed', channelID);
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
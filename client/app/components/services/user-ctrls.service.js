(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserCtrls', UserCtrls);

    UserCtrls.$inject = ['DEFAULTS', 'PRESETS'];

    /* @ngInject */
    function UserCtrls(DEFAULTS, PRESETS) {
        var self = this;
        self.getSearchPeriod = getSearchPeriod;

        activate();

        ////////////////
        function activate () {
            angular.merge(self, DEFAULTS.userCtrls);
            
        }

        function tuneInChannel (channelID, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            self.tunedInChannelID = channelID;
        };

        function getSearchPeriod () {
            if(self.search.create_time.preset in PRESETS.periods){
                return PRESETS.periods[self.search.create_time.preset];
            }
            else{
                return PRESETS.periods['anyTime'];
            }
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserCtrls', UserCtrls);

    UserCtrls.$inject = ['DEFAULTS'];

    /* @ngInject */
    function UserCtrls(DEFAULTS) {
        var self = this;
        self.tunedInChannelID = '';
        self.tuneInChannel = tuneInChannel;


        activate();

        ////////////////
        function activate () {
            self.tunedInChannelID = Object.keys(DEFAULTS.channels)[0];
        }

        function tuneInChannel (channelID, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            self.tunedInChannelID = channelID;
        };


    }
})();
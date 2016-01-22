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
        self.selectedSpirit = '';

        activate();

        ////////////////
        function activate () {
            self.tunedInChannelID = Object.keys(DEFAULTS.channels)[0];
        }
    }
})();
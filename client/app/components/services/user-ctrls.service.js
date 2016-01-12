(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserCtrls', UserCtrls);

    UserCtrls.$inject = ['DEFAULTS'];

    /* @ngInject */
    function UserCtrls(DEFAULTS) {
        var self = this;
        self.tunedInStationID = '';
        self.selectedSpirit = '';

        activate();

        ////////////////
        function activate () {
            self.tunedInStationID = Object.keys(DEFAULTS.stations)[0];
        }
    }
})();
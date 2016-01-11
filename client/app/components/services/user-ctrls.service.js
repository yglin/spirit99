(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserCtrls', UserCtrls);

    UserCtrls.$inject = ['DEFAULTS'];

    /* @ngInject */
    function UserCtrls(DEFAULTS) {
        var self = this;
        self.selectedStationID = '';
        self.selectedSpirit = '';

        activate();

        ////////////////
        function activate () {
            self.selectedStationID = Object.keys(DEFAULTS.stations)[0];
        }
    }
})();
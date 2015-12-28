(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserCtrls', UserCtrls);

    UserCtrls.$inject = ['DEFAULTS'];

    /* @ngInject */
    function UserCtrls(DEFAULTS) {
        var self = this;
        self.selectedStation = '';
        self.selectedResource = '';

        activate();

        ////////////////
        function activate () {
        }
    }
})();
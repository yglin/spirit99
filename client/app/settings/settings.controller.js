(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope'];

    /* @ngInject */
    function SettingsController($scope) {
        var settingsVM = this;
        settingsVM.title = 'Settings';

        activate();

        ////////////////

        function activate() {
        }
    }
})();

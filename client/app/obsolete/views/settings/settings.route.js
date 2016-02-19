(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(SettingsRouter);

    SettingsRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function SettingsRouter($routeProvider){
        $routeProvider.when('/settings', {
            templateUrl: 'app/settings/settings.html',
            controller: 'SettingsController',
            controllerAs: 'settingsVM'
        });        
    }

})();

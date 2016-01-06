(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(StationsRouter);

    StationsRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function StationsRouter($routeProvider){
        $routeProvider.when('/stations', {
            templateUrl: 'app/stations/stations.html',
            controller: 'StationsController',
            controllerAs: 'stationsVM'
        });        
    }

})();
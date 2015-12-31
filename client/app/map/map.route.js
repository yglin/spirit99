(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(MapRouter);

    MapRouter.$inject = ['$routeProvider'];

    function MapRouter($routeProvider){
        $routeProvider.when('/map', {
            templateUrl: 'app/map/map.html',
            controller: 'MapController',
            controllerAs: 'mapVM',
            resolve: {
                initMapArea: ['initUtils', function (initUtils) {
                    return initUtils.promiseGetInitMapArea();
                }]
            }
        });
    }

})();
(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(MapRouter);

    MapRouter.$inject = ['$routeProvider'];

    function MapRouter($routeProvider){
        $routeProvider.when('/map', {
            templateUrl: 'app/views/map/map.html',
            controller: 'MapController',
            controllerAs: 'mapVM',
            resolve: {
                initMap: ['UserCtrls', function (UserCtrls) {
                    return UserCtrls.promiseGetInitMapArea();
                }]
            }
        });
    }

})();
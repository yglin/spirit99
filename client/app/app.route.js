(function(){

    'use strict';

    angular.module('spirit99')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainController',
            controllerAs: 'mainVM',
            templateUrl: 'app/layout/main/main.html',
            // resolve: {
            //     mapInstances: function (uiGmapIsReady) {
            //         return uiGmapIsReady.promise(1);
            //     }
            // }
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
})();

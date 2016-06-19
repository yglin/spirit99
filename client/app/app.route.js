(function(){

    'use strict';

    angular.module('spirit99')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainController',
            controllerAs: '$ctrl',
            templateUrl: 'app/layout/main/main.html',
            // resolve: {}
        })
        .when('/', {
            controller: 'MainController',
            controllerAs: '$ctrl',
            templateUrl: 'app/layout/main/main.html',
            // resolve: {}
        })
        .otherwise({redirectTo: '/'});
    }]);
})();

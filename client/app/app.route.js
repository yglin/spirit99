(function(){

    'use strict';

    angular.module('spirit99')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainController',
            controllerAs: 'mainVM',
            templateUrl: 'app/layout/main/main.html',
            resolve: {
                googleMapsApi: ['uiGmapGoogleMapApi', function (uiGmapGoogleMapApi) {
                    return uiGmapGoogleMapApi.then(function (googleMapsApi) {
                        return googleMapsApi;
                    });
                }]
            }
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
})();

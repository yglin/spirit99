(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(SearchRouter);

    SearchRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function SearchRouter($routeProvider){
        $routeProvider.when('/search', {
            templateUrl: 'app/search/search.html',
            controller: 'SearchController',
            controllerAs: 'searchVM'
        });        
    }

})();

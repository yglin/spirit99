(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(['$locationProvider',function($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .config(['localStorageServiceProvider',function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('spirit99');
    }]);
})();
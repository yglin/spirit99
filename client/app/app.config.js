(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(['localStorageServiceProvider',function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('spirit99');
    }])
    .constant('CONFIG', function () {
        return {
            env: 'development',
            MIN_POSTS_FOR_LIST: 10
        };        
    });


})();
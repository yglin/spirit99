(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(['$locationProvider',function($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .config(['localStorageServiceProvider',function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('spirit99');
    }])
    .constant('CONFIG', {
        env: 'development',
        debug: true,
        MIN_POSTS_FOR_LIST: 10,
        CHANNEL_SAVING_FIELDS: ['portal-url', 'id', 'title', 'description', 'logo-url']
    });


})();
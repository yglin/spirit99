(function() {
    'use strict';

    angular
    .module('spirit99')
    .constant('CONFIG', configProvider());

    function configProvider() {
        return {
            env: 'development',
            MIN_POSTS_FOR_LIST: 10
        };
    }

})();
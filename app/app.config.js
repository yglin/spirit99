(function() {
    'use strict';

    angular
    .module('spirit99')
    .constant('CONFIG', configProvider());

    function configProvider() {
        return {
            env: 'development'
        };
    }

})();
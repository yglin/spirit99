(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(['localStorageServiceProvider',function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('spirit99');
    }])

})();
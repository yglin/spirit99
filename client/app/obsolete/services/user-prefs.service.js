(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('UserPrefs', UserPrefs);

    UserPrefs.$inject = ['DEFAULTS', 'localStorageService'];

    /* @ngInject */
    function UserPrefs(DEFAULTS, localStorageService) {
        var self = this;
        self.get = get;

        ////////////////

        function get(key) {
            var value = localStorageService.get(key);
            if(value){
                return value;
            }
            else if(key in DEFAULTS){
                return DEFAULTS[key];
            }
            else{
                return null;
            }
        }
    }
})();

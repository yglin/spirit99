(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('IconManager', IconManager);

    IconManager.$inject = ['FakeData'];

    /* @ngInject */
    function IconManager(FakeData) {
        var self = this;
        self.getIconObjects = getIconObjects;

        ////////////////
        
        // TODO: Implement
        function getIconObjects (spiritMeta, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return FakeData.genFakeIconObjects();
        };
    }
})();
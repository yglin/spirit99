(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('ResourceManager', ResourceManager);

    ResourceManager.$inject = ['$q', 'FakeData'];

    /* @ngInject */
    function ResourceManager($q, FakeData) {
        var self = this;
        self.promiseLoadResources = promiseLoadResources;
        self.getResourcer = getResourcer;

        ////////////////
        // TODO: Implement
        function getResourcer (resourceMeta, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return {};
        };

        // TODO: Implement
        function promiseLoadResources (resourceMeta, mapBounds, options) {
            options = typeof options === 'undefined' ? {} : options;
            return $q.resolve(FakeData.genFakeResources({count: 50}));
        };
    }
})();
(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('SpiritManager', SpiritManager);

    SpiritManager.$inject = ['$q', 'FakeData'];

    /* @ngInject */
    function SpiritManager($q, FakeData) {
        var self = this;
        self.promiseLoadSpirits = promiseLoadSpirits;
        self.getSpirit = getSpirit;

        ////////////////
        // TODO: Implement
        function getSpirit (spiritMeta, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return {};
        };

        // TODO: Implement
        function promiseLoadSpirits (spiritMeta, mapBounds, options) {
            options = typeof options === 'undefined' ? {} : options;
            return $q.resolve(FakeData.genFakeSpirits({count: 50}));
        };
    }
})();
(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('PostManager', PostManager);

    PostManager.$inject = ['$q', 'FakeData'];

    /* @ngInject */
    function PostManager($q, FakeData) {
        var self = this;
        self.promiseLoadPosts = promiseLoadPosts;
        self.getPost = getPost;

        ////////////////
        // TODO: Implement
        function getPost (postMeta, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return {};
        };

        // TODO: Implement
        function promiseLoadPosts (postMeta, mapBounds, options) {
            options = typeof options === 'undefined' ? {} : options;
            return $q.resolve(FakeData.genFakePosts({count: Math.floor(Math.random() * (20)) + 5}));
        };
    }
})();
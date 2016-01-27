(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('FakeData', FakeData);

    FakeData.$inject = ['DEFAULTS'];

    /* @ngInject */
    function FakeData(DEFAULTS) {
        var self = this;
        self.genFakeMap = genFakeMap;
        self.genFakePosts = genFakePosts;
        self.genFakeIconObjects = genFakeIconObjects;

        ////////////////
        function genFakeMap (requiredArg1, requiredArg2, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return DEFAULTS.map;
        };

        function genFakePosts(options) {
            options = typeof options === 'undefined' ? {} : options;
            options.count = typeof options.count === 'undefined' ? 10 : options.count;
            options.countHasCategory = typeof options.countHasCategory === 'undefined' ? options.count : options.countHasCategory;  
            var posts = [];
            var categories = Object.keys(self.genFakeIconObjects());
            for (var i = 0; i < options.count; i++) {
                var post = {
                    id: i+1,
                    latitude: 23.973875 + 2 * (0.5 - Math.random()),
                    longitude: 120.982024 + 2 * (0.5 - Math.random()),
                };
                if(i < options.countHasCategory){
                    post.category = _.sample(categories);
                }
                posts.push(post);
            };
            return posts;
        }

        function genFakeIconObjects (options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return {
                'food': {
                    url: 'http://food.icon.url'
                },
                'cloth': {
                    url: 'http://cloth.icon.url'
                },
                'house': {
                    url: 'http://house.icon.url'
                },
                'transport': {
                    url: 'http://transport.icon.url'
                }
            };
        };
    }
})();
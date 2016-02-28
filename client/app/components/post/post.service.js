(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Post', Post);

    Post.$inject = ['FakeData', 'Category'];

    /* @ngInject */
    function Post(FakeData, Category) {
        var self = this;
        self.posts = [];
        // self.icons = ICONS();
        self.prmsInitPosts = prmsInitPosts;
        self.normalize = normalize;

        ////////////////

        function normalize (post) {
            if(!post.category){
                post.category = 'misc';
            }
            post.icon = Category.getIconObject(post.category);            
        }

        function prmsInitPosts () {
            return FakeData.genFakePosts({ count: 10 + Math.floor(Math.random() * 40)})
            .then(function (posts) {
                // console.debug(posts);
                self.posts.length = 0;
                angular.extend(self.posts, posts);
                for (var i = 0; i < posts.length; i++) {
                    self.normalize(posts[i]);
                };
                return self.posts;
            });
        }

        //////////////////// Functions for initialize default CONSTANTS
    }
})();

(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('PostManager', PostManager);

    PostManager.$inject = ['$rootScope', '$q', 'FakeData', 'UserCtrls', 'ChannelManager'];

    /* @ngInject */
    function PostManager($rootScope, $q, FakeData, UserCtrls, ChannelManager) {
        var self = this;
        self.posts = [];
        self.promiseLoadPosts = promiseLoadPosts;
        self.getPost = getPost;
        self.searchPosts = searchPosts;

        ////////////////
        // TODO: Implement
        function getPost (postMeta, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return {};
        };

        // TODO: Implement
        function promiseLoadPosts (postMeta, mapBounds) {
            self.posts.length = 0;
            return FakeData.genFakePosts({count: Math.floor(Math.random() * 45) + 5}).then(
            function (fakePosts) {
                self.posts.push.apply(self.posts, fakePosts);
                for (var i = 0; i < self.posts.length; i++) {
                    normalize(self.posts[i]);
                };
                return self.posts;
            }, function (error) {
                console.debug(error);
            });
        };

        function normalize(post) {
            post.matchSearch = true;
        }

        function searchPosts () {
            var categories = ChannelManager.categories;
            var keywords = UserCtrls.getSearchKeywords();
            // console.log(keywords);
            var period = UserCtrls.getSearchPeriod();
            // console.log(period);
            for (var i = 0; i < self.posts.length; i++) {
                var post = self.posts[i];
                post.matchSearch = true;

                for (var j = 0; j < keywords.length; j++) {
                    if(post.title.indexOf(keywords[j]) < 0){
                        post.matchSearch = false;
                        break;
                    }
                };
                
                var createTime = new Date(post.create_time);
                if(createTime >= period.start && createTime < period.end){
                    post.matchSearch = post.matchSearch && true;
                }
                else{
                    post.matchSearch = false;
                }

                if(post.category in categories){
                    post.matchSearch = post.matchSearch && categories[post.category].show;
                }
                else{
                    post.matchSearch = false;
                }

            }
            $rootScope.$broadcast('search:changed');
        }
    }
})();
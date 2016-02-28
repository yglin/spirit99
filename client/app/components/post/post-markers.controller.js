(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostMarkersController',PostMarkersController);

    PostMarkersController.$inject = ['Post'];

    /* @ngInject */
    function PostMarkersController(Post) {
        var postMarkersVM = this;
        postMarkersVM.posts = undefined;

        activate();

        ////////////////

        function activate() {
            Post.prmsInitPosts()
            .then(function () {
                postMarkersVM.posts = Post.posts;
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostListController',PostListController);

    PostListController.$inject = ['$scope', 'Post'];

    /* @ngInject */
    function PostListController($scope, Post) {
        var postListVM = this;
        postListVM.title = 'PostList';
        postListVM.posts = [];

        activate();

        ////////////////

        function activate () {
            $scope.$on('post:reload', function () {
                postListVM.posts.length = 0;
                Post.addFilteredPosts(postListVM.posts);
            });

            $scope.$on('post:filterChanged', function () {
                postListVM.posts.length = 0;
                Post.addFilteredPosts(postListVM.posts);
            });

        }
    }
})();
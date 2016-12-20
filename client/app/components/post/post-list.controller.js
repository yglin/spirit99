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
        postListVM.posts = Post.posts;

        activate();

        ////////////////

        function activate () {
        }
    }
})();
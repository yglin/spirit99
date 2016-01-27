(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostListController',PostListController);

    PostListController.$inject = ['$scope', 'UserCtrls', 'ChannelManager', 'PostManager'];

    /* @ngInject */
    function PostListController($scope, UserCtrls, ChannelManager, PostManager) {
        var postListVM = this;
        postListVM.title = 'PostList';
        postListVM.posts = [];

        activate();

        ////////////////

        function activate() {
            var postPortal = ChannelManager.getPostPortal(UserCtrls.tunedInChannelID);
            postListVM.posts = PostManager.getPost(postPortal);
        }
    }
})();
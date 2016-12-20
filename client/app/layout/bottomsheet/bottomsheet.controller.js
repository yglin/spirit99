/*
* @Author: yglin
* @Date:   2016-07-20 20:44:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-12-20 16:42:01
*/

(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('BottomsheetController', BottomsheetController);

    BottomsheetController.$inject = ['$scope', '$rootScope', 'Post'];

    /* @ngInject */
    function BottomsheetController($scope, $rootScope, Post) {
        var $ctrl = this;
        $ctrl.title = 'Bottomsheet';
        $ctrl.isOpen = false;
        $ctrl.posts = [];

        $ctrl.toggleOpen = toggleOpen;
        $ctrl.onClickPost = onClickPost;

        activate();

        ////////////////

        function activate() {
            $scope.$on('post:reload', function () {
                $ctrl.posts.length = 0;
                Post.addFilteredPosts($ctrl.posts);
            });

            $scope.$on('post:filterChanged', function () {
                $ctrl.posts.length = 0;
                Post.addFilteredPosts($ctrl.posts);
            });
        }

        function toggleOpen() {
            $ctrl.isOpen = !$ctrl.isOpen;
        }

        function onClickPost(index) {
            $rootScope.$broadcast('post:show', Post.posts[index]);
        }
    }
})();

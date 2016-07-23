/*
* @Author: yglin
* @Date:   2016-07-20 20:44:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-23 11:56:23
*/

(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('BottomsheetController', BottomsheetController);

    BottomsheetController.$inject = ['$rootScope', 'Post'];

    /* @ngInject */
    function BottomsheetController($rootScope, Post) {
        var $ctrl = this;
        $ctrl.title = 'Bottomsheet';
        $ctrl.isOpen = false;
        $ctrl.posts = undefined;

        $ctrl.toggleOpen = toggleOpen;
        $ctrl.onClickPost = onClickPost;

        activate();

        ////////////////

        function activate() {
            $ctrl.posts = Post.posts;
        }

        function toggleOpen() {
            $ctrl.isOpen = !$ctrl.isOpen;
        }

        function onClickPost(index) {
            $rootScope.$broadcast('post:show', Post.posts[index]);
        }
    }
})();

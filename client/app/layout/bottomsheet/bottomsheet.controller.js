/*
* @Author: yglin
* @Date:   2016-07-20 20:44:54
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-22 13:36:31
*/

(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('BottomsheetController', BottomsheetController);

    BottomsheetController.$inject = ['Post'];

    /* @ngInject */
    function BottomsheetController(Post) {
        var $ctrl = this;
        $ctrl.title = 'Bottomsheet';
        $ctrl.isOpen = false;

        $ctrl.toggleOpen = toggleOpen;

        activate();

        ////////////////

        function activate() {
            $ctrl.posts = Post.posts;
            // console.log($ctrl.posts);
        }

        function toggleOpen() {
            $ctrl.isOpen = !$ctrl.isOpen;
        }
    }
})();

/*
* @Author: yglin
* @Date:   2016-07-23 11:13:17
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-25 10:44:47
*/

(function() {
    'use strict';

    angular.module('spirit99')
    .component('s99PostViewer',{
        templateUrl: 'app/components/post/viewer/post-viewer.tpl.html',
        controller: PostViewerController,
        bindings: {
            post: '='
        }
    });

    PostViewerController.$inject = ['$mdDialog'];

    /* @ngInject */
    function PostViewerController($mdDialog) {
        var $ctrl = this;
        $ctrl.title = 'PostViewer';
        $ctrl.cancel = cancel;

        $ctrl.$onInit = function () {
        };

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();

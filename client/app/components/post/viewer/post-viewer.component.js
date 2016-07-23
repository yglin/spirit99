/*
* @Author: yglin
* @Date:   2016-07-23 11:13:17
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-23 11:59:56
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

    PostViewerController.$inject = [];

    /* @ngInject */
    function PostViewerController() {
        var $ctrl = this;
        $ctrl.title = 'PostViewer';

        $ctrl.$onInit = function () {
        };
    }
})();

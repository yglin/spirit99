(function() {
    'use strict';

    angular
        .module('spirit99')
        .directive('s99PostItem', PostItem);

    PostItem.$inject = [];

    /* @ngInject */
    function PostItem() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/components/post/post-item.tpl.html',
            bindToController: true,
            controller: PostItemController,
            controllerAs: 'postItemVM',
            link: link,
            restrict: 'EA',
            scope: {
                post: '=post'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function PostItemController() {

    }
})();

(function() {
    'use strict';

    angular
        .module('spirit99')
        .directive('s99BookmarkItem', BookmarkItem);

    BookmarkItem.$inject = [];

    /* @ngInject */
    function BookmarkItem() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/views/bookmark-list/bookmark-item.tpl.html',
            bindToController: true,
            controller: BookmarkItemController,
            controllerAs: 'bookmarkItemVM',
            link: link,
            restrict: 'EA',
            scope: {
                bookmark: '=',
                remove: '&',
                apply: '&'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function BookmarkItemController() {
    }
})();
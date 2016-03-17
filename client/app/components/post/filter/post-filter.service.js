(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('PostFilter', PostFilter);

    PostFilter.$inject = ['$rootScope'];

    /* @ngInject */
    function PostFilter($rootScope) {
        var self = this;
        self.keywords = [];
        self.filter = filter;
        self.onAddKeyword = onAddKeyword;
        self.onRemoveKeyword = onRemoveKeyword;

        ////////////////

        function onAddKeyword() {
            $rootScope.$broadcast('post:filterChanged');
        }

        function onRemoveKeyword () {
            $rootScope.$broadcast('post:filterChanged');
        }

        function filter (post) {
            for (var i = 0; i < self.keywords.length; i++) {
                if (post.title.indexOf(self.keywords[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('PostFilter', PostFilter);

    PostFilter.$inject = ['$rootScope', 'DatePeriod', 'Category'];

    /* @ngInject */
    function PostFilter($rootScope, DatePeriod, Category) {
        var self = this;
        self.keywords = [];
        self.createTime = {};
        self.categories = Category.categories;
        self.filter = filter;
        self.onAddKeyword = onAddKeyword;
        self.onRemoveKeyword = onRemoveKeyword;
        self.onChangeDatePeriod = onChangeDatePeriod;

        activate();

        ////////////////
        function activate () {
            self.createTime.preset = 'anyTime';
            self.createTime.start = DatePeriod.getPresetStart(self.createTime.preset);
            self.createTime.end = DatePeriod.getPresetEnd(self.createTime.preset);
        }

        function onAddKeyword() {
            $rootScope.$broadcast('post:filterChanged');
        }

        function onRemoveKeyword () {
            $rootScope.$broadcast('post:filterChanged');
        }

        function filter (post) {
            // Filter by keywords against post title
            for (var i = 0; i < self.keywords.length; i++) {
                if (post.title.indexOf(self.keywords[i]) < 0) {
                    return false;
                }
            }

            // Filter by create_time in-between date period
            if (!DatePeriod.inBetween(post.create_time, self.createTime.start, self.createTime.end)) {
                return false;
            }

            if (!Category.isVisible(post.category)) {
                return false;
            };

            return true;
        }

        function onChangeDatePeriod () {
            if (self.createTime.preset != 'custom') {
                self.createTime.start = DatePeriod.getPresetStart(self.createTime.preset);
                self.createTime.end = DatePeriod.getPresetEnd(self.createTime.preset);                
            }
            $rootScope.$broadcast('post:filterChanged');
        }
    }
})();

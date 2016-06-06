(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('PostFilter', PostFilter);

    PostFilter.$inject = ['$rootScope', '$routeParams', 'DatePeriod', 'Category'];

    /* @ngInject */
    function PostFilter($rootScope, $routeParams, DatePeriod, Category) {
        var self = this;
        self.keywords = [];
        self.createTime = {};
        self.event = {};
        self.isEvent = undefined;
        self.categories = Category.categories;
        self.filter = filter;
        self.onChange = onChange;
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

        function onChange() {
            $rootScope.$broadcast('post:filterChanged');
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
            if (self.createTime.start && self.createTime.end
                && !DatePeriod.inBetween(post.create_time, self.createTime.start, self.createTime.end)) {
                return false;
            }

            if (self.isEvent && self.event.start) {
                if (!post.startAt) {
                    return false;
                }
                var startAt = new Date(post.startAt);
                if (startAt < self.event.start) {
                    return false;
                }
            }

            if (self.isEvent && self.event.end) {
                if (!post.endAt) {
                    return false;
                }
                var endAt = new Date(post.endAt);
                var endMidnight = new Date(self.event.end.getTime() + 24 * 60 * 60 * 1000);
                if (endAt > endMidnight) {
                    return false;
                }
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

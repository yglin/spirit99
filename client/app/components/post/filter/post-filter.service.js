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
        self.onChangeDatePeriod = onChangeDatePeriod;
        self.getParams = getParams;

        activate();

        ////////////////
        function activate () {
            // defaults
            self.createTime.preset = 'anyTime';
            self.createTime.start = DatePeriod.getPresetStart(self.createTime.preset);
            self.createTime.end = DatePeriod.getPresetEnd(self.createTime.preset);                

            if ($routeParams.filters) {
                var filters = JSON.parse($routeParams.filters);
                if (filters.keywords) {
                    self.keywords.push.apply(self.keywords, filters.keywords);
                }

                if (filters.createAt) {
                    angular.extend(self.createTime, filters.createAt);
                    self.createTime.start = new Date(self.createTime.start);
                    self.createTime.end = new Date(self.createTime.end);
                }

                if (filters.event) {
                    self.isEvent = true;
                    self.event.start = new Date(filters.event.start);
                    self.event.end = new Date(filters.event.end);
                }

            }
        }

        function getParams() {
            var params = {}
            if (self.keywords.length > 0) {
                params.keywords = self.keywords;
            }

            if (self.createTime.preset != 'anyTime') {
                params.createAt = self.createTime;
            }

            if (self.isEvent) {
                params.event = self.event;
            }

            return { filters: params };
        }

        function onChange() {
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

(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Post', Post);

    Post.$inject = ['$rootScope', '$window', '$timeout', '$q', '$log', '$http', 'CONFIG', 'Channel', 'Map', 'Category', 'PostFilter'];

    /* @ngInject */
    function Post($rootScope, $window, $timeout, $q, $log, $http, CONFIG, Channel, Map, Category, PostFilter) {
        var self = this;
        self.posts = [];
        self.REQUIRED_FIELDS = REQUIRED_FIELDS();
        // self.icons = ICONS();
        self.validate = validate;
        self.normalize = normalize;
        self.reloadPosts = reloadPosts;
        self.applyFilters = applyFilters;
        self.prmsCreate = prmsCreate;

        activate();

        ////////////////
        function activate () {
            $rootScope.$on('channel:tuned', function () {
                self.reloadPosts();                    
            });
            $rootScope.$on('map:idle', function () {
                self.reloadPosts();                    
            });
            $rootScope.$on('post:filterChanged', function () {
                self.applyFilters();
            });
            $rootScope.$on('map:click', function (event, location) {
                self.prmsCreate(location);
            });
        }

        function validate (post) {
            for (var key in self.REQUIRED_FIELDS) {
                if (!(key in post) || typeof post[key] !== self.REQUIRED_FIELDS[key]) {
                    $log.warn('Received invalid post: ' + post);
                    return false;
                }
            }
            return true;
        }
        
        function normalize (post) {
            if (!post.category) {
                post.category = 'misc';
            }

            if (!post.options) {
                post.options = {};
            }
            post.options.title = post.title;
            post.options.icon = Category.getIcon(post.category);
            if (CONFIG.env == 'development') {
                post.options.optimized = false;
            }

            post.options.visible = PostFilter.filter(post);
        }

        function reloadPosts () {
            self.posts.length = 0;
            var queryUrl = Channel.getQueryUrl();
            if (!queryUrl) {
                return;
            }
            var bounds = Map.getBounds();
            $rootScope.$broadcast('post:loadStart');
            $rootScope.$broadcast('progress:start');
            $http({
                method: 'GET',
                url: queryUrl,
                params: {
                    bounds: bounds
                }
            }).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var post = response.data[i];
                    if (self.validate(post)) {
                        self.normalize(post);
                        self.posts.push(post);
                    }
                }
                return $q.resolve(self.posts);
            }, function (error) {
                $log.warn('Fail to load posts from ' + queryUrl);
                $log.warn(error.data);
                return $q.reject(error);
            }).finally(function () {
                $rootScope.$broadcast('post:loadEnd');
                $rootScope.$broadcast('progress:end');
            });
        }

        function prmsCreate (location) {
            var createUrl = Channel.getCreateUrl();
            if (!createUrl) {
                return $q.reject();
            }
            $window.location.replace(createUrl + '?latitude=' + location.latitude + '&longitude=' + location.longitude);
            return $q.resolve();
        }

        function applyFilters () {
            for (var i = 0; i < self.posts.length; i++) {
                if (!self.posts[i].options) {
                    self.posts[i].options = {};
                }
                self.posts[i].options.visible = PostFilter.filter(self.posts[i]);
            }            
        }

        //////////////////// Functions for initialize default CONSTANTS
        function REQUIRED_FIELDS () {
            return {
                id: 'number',
                title: 'string',
                latitude: 'number',
                longitude: 'number'
            };
        }
    }
})();

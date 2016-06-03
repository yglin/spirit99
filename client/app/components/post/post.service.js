(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Post', Post);

    Post.$inject = ['$rootScope', '$window', '$location', '$timeout', '$q', '$log', '$http', '$httpParamSerializer',
 'CONFIG', 'Channel', 'Map', 'Category', 'PostFilter'];

    /* @ngInject */
    function Post($rootScope, $window, $location, $timeout, $q, $log, $http, $httpParamSerializer
, CONFIG, Channel, Map, Category, PostFilter) {
        var self = this;
        self.posts = [];
        self.lastQuery = {};
        self.issueQuery = issueQuery;
        self.REQUIRED_FIELDS = REQUIRED_FIELDS();
        // self.icons = ICONS();
        self.onMapIdleReloadPosts = onMapIdleReloadPosts;
        self.validate = validate;
        self.normalize = normalize;
        self.reloadPosts = reloadPosts;
        self.applyFilters = applyFilters;
        self.prmsCreate = prmsCreate;

        activate();

        ////////////////
        function activate () {
            $rootScope.$on('channel:tuned', function () {
                self.issueQuery();
            });
            $rootScope.$on('map:dragend', function () {
                self.issueQuery();
            });
            
            $rootScope.$on('map:zoom_changed', function () {
                self.onMapIdleReloadPosts();
            });

            $rootScope.$on('map:navigate', function () {
                self.onMapIdleReloadPosts();
            });

            $rootScope.$on('post:filterChanged', function () {
                self.applyFilters();
            });
        }

        function onMapIdleReloadPosts () {
            if (!self.unbindOnMapIdleReloadPosts) {
                // Listen for event "map:idle"
                self.unbindOnMapIdleReloadPosts = $rootScope.$on('map:idle', function () {
                    self.issueQuery();
                    // Clear listening, until next time "map:zoom_changed" event is on
                    self.unbindOnMapIdleReloadPosts();
                    self.unbindOnMapIdleReloadPosts = null;
                });
            }            
        }

        function issueQuery () {
            self.lastQuery.channelID = Channel.tunedInChannelID;
            self.lastQuery.bounds = Map.map.bounds;
            self.lastQuery.dirty = true;
            self.reloadPosts(self.lastQuery);
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
            if (post._id) {
                post.id = post._id;
            }

            if (post.createdAt) {
                post.create_time = post.createdAt;
            }

            if (!post.category) {
                post.category = 'misc';
            }

            if (!post.options) {
                post.options = {};
            }
            post.options.title = post.title;
            post.options.icon = Category.getIcon(post.category);
            if (CONFIG.DEBUG) {
                post.options.zIndex = post.id * 100;
                post.options.optimized = false;
            }

            post.options.visible = PostFilter.filter(post);
        }

        function reloadPosts (query) {
            self.posts.length = 0;
            var queryUrl = Channel.getData(query.channelID, 'query-url');
            if (!queryUrl) {
                return;
            }
            // $rootScope.$broadcast('post:loadStart');
            $rootScope.$broadcast('progress:start');
            query.dirty = false;
            $http({
                method: 'GET',
                url: queryUrl,
                params: {
                    bounds: query.bounds
                }
            }).then(function (response) {
                if (!query.dirty) {
                    for (var i = 0; i < response.data.length; i++) {
                        var post = response.data[i];
                        if (self.validate(post)) {
                            self.normalize(post);
                            self.posts.push(post);
                        }
                    }
                }
                return $q.resolve(self.posts);
            }, function (error) {
                $log.warn('Fail to load posts from ' + queryUrl);
                $log.warn(error.data);
                return $q.reject(error);
            }).finally(function () {
                // $rootScope.$broadcast('post:loadEnd');
                $rootScope.$broadcast('progress:end');
            });
        }

        function prmsCreate (location) {
            var createUrl = Channel.getData('create-url');
            if (!createUrl) {
                return $q.reject();
            }
            var queryParams = {
                latitude: location.latitude,
                longitude: location.longitude
            };
            var returnUrl = $location.protocol() + '://'+ $location.host() +':'+  $location.port();
            if (Channel.tunedInChannelID) {
                returnUrl += '/' + Channel.tunedInChannelID;
            }
            returnUrl += '?' + $httpParamSerializer({
                map: {
                    center: Map.map.center,
                    zoom: Map.map.zoom
                }
            });
            queryParams.returnUrl = returnUrl;
            $window.location.replace(createUrl + '?' + $httpParamSerializer(queryParams));
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
                title: 'string',
                latitude: 'number',
                longitude: 'number'
            };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostMarkersController', PostMarkersController);

    PostMarkersController.$inject = ['$scope', '$timeout', 'CONFIG', 'Channel', 'Post', 'PostFilter', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function PostMarkersController($scope, $timeout, CONFIG, Channel, Post, PostFilter, uiGmapGoogleMapApi) {
        var gMapApi = null;
        var postMarkersVM = this;
        postMarkersVM.settings = Post.settings;
        postMarkersVM.posts = [];
        postMarkersVM.events = {
            click: onClick
        };
        postMarkersVM.infoWindow = {
            coords: {
                latitude: 0.0,
                longitude: 0.0
            },
            show: false,
            options: {
                maxWidth: 100
            },
            control: {}
        };
        
        postMarkersVM.cluster = {};
        postMarkersVM.showInfoWindow = showInfoWindow;
        postMarkersVM.createPost = createPost;

        activate();

        ////////////////

        function activate() {
            uiGmapGoogleMapApi.then(function (googleMapsApi) {
                gMapApi = googleMapsApi;
            });

            if (CONFIG.MARKER_CLUSTER_TYPE) {
                postMarkersVM.cluster.type = CONFIG.MARKER_CLUSTER_TYPE;
            }

            $scope.$on('post:reload', function () {
                postMarkersVM.posts.length = 0;
                Post.addFilteredPosts(postMarkersVM.posts);
            });

            $scope.$on('post:filterChanged', function () {
                postMarkersVM.posts.length = 0;
                Post.addFilteredPosts(postMarkersVM.posts);
            });

            $scope.$on('map:dragstart', function () {
                // if (typeof postMarkersVM.infoWindow.control.hideWindow == 'function') {
                //     postMarkersVM.infoWindow.control.hideWindow();
                // }
                $timeout(function () {
                    postMarkersVM.infoWindow.show = false;                
                });
            });

            $scope.$on('map:zoom_changed', function () {
                // if (typeof postMarkersVM.infoWindow.control.hideWindow == 'function') {
                //     postMarkersVM.infoWindow.control.hideWindow();
                // }
                $timeout(function () {
                    postMarkersVM.infoWindow.show = false;                
                });
            });

            $scope.$on('map:click', function (event, location) {
                if (Channel.getData('create-url')) {
                    $scope.$apply(function () {
                        postMarkersVM.showInfoWindow(location,
                        'app/components/post/info-window/create.tpl.html',
                        {
                            createPost: postMarkersVM.createPost
                        });
                    });
                }
            });

            $scope.$on('map:geocode', function (event, location) {
                if (Channel.getData('create-url')) {
                    postMarkersVM.showInfoWindow(location,
                    'app/components/post/info-window/create.tpl.html',
                    {
                        createPost: postMarkersVM.createPost
                    });
                }
            });

            $scope.$on('post:show', function (event, post) {
                postMarkersVM.showInfoWindow(post,
                'app/components/post/info-window/post.tpl.html',
                post,
                {x: 0, y: 0});
            });
        }

        function onClick (markerGObj, event, markerModel) {
            $scope.$apply(function () {
                postMarkersVM.showInfoWindow(markerModel,
                'app/components/post/info-window/post.tpl.html',
                markerModel,
                {x: 0, y: 0});
            });
        }

        function showInfoWindow (coords, templateUrl, templateParameter, pixelOffset) {
            postMarkersVM.infoWindow.show = false;
            postMarkersVM.infoWindow.coords.latitude = coords.latitude;
            postMarkersVM.infoWindow.coords.longitude = coords.longitude;
            postMarkersVM.infoWindow.templateUrl = templateUrl;
            postMarkersVM.infoWindow.templateParameter = templateParameter;
            if (gMapApi && pixelOffset) {
                postMarkersVM.infoWindow.options.pixelOffset = new gMapApi.Size(pixelOffset.x, pixelOffset.y);
            }
            else {
                postMarkersVM.infoWindow.options.pixelOffset = null;
            }
            // Info window auto-pan only works when it's closed and shows up in next angular digest cycle.
            $timeout(function () {
                postMarkersVM.infoWindow.show = true;                
            }, 100);
        }

        function createPost () {
            Post.prmsCreate(postMarkersVM.infoWindow.coords);
        }

        // function showInfoWindow (marker) {
        //     if (!marker.infoWindowTemplateUrl) {
        //         marker.infoWindowTemplateUrl = 'app/components/post/info-window/info-window.tpl.html';
        //     }
        //     // if (typeof marker.closeInfoWindow != 'function') {
        //     //     marker.closeInfoWindow = function () {
        //     //         console.log('Close me~!!!');
        //     //         this.showInfoWindow = false;
        //     //     };
        //     // }
        //     // marker.infoWindowParameters = {
        //     //     id: marker.id,
        //     //     title: marker.title,
        //     //     thumbnail: marker.thumbnail
        //     // };
        //     // marker.showInfoWindow = true;
        // }
    }
})();

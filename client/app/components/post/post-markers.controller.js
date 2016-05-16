(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('PostMarkersController', PostMarkersController);

    PostMarkersController.$inject = ['$scope', '$timeout', 'Channel', 'Post', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function PostMarkersController($scope, $timeout, Channel, Post, uiGmapGoogleMapApi) {
        var gMapApi = null;
        var postMarkersVM = this;
        postMarkersVM.posts = Post.posts;
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
        postMarkersVM.cluster = {
            type: 'cluster'
        };

        postMarkersVM.showInfoWindow = showInfoWindow;
        postMarkersVM.createPost = createPost;

        activate();

        ////////////////

        function activate() {
            uiGmapGoogleMapApi.then(function (googleMapsApi) {
                gMapApi = googleMapsApi;
            });

            $scope.$on('map:dragstart', function () {
                if (typeof postMarkersVM.infoWindow.control.hideWindow == 'function') {
                    postMarkersVM.infoWindow.control.hideWindow();
                }
            });

            $scope.$on('map:zoom_changed', function () {
                if (typeof postMarkersVM.infoWindow.control.hideWindow == 'function') {
                    postMarkersVM.infoWindow.control.hideWindow();
                }
            });

            $scope.$on('map:click', function (event, location) {
                if (Channel.getData('create-url')) {
                    postMarkersVM.showInfoWindow(location,
                    'app/components/post/info-window/create.tpl.html',
                    {
                        createPost: postMarkersVM.createPost
                    });
                }
            });
        }

        function onClick (markerGObj, event, markerModel) {
            postMarkersVM.showInfoWindow(markerModel,
            'app/components/post/info-window/post.tpl.html',
            markerModel,
            {x: 0, y: -40});
        }

        function showInfoWindow (coords, templateUrl, templateParameter, pixelOffset) {
            $scope.$apply(function () {
                postMarkersVM.infoWindow.show = false;
            });
            $scope.$apply(function () {
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
                postMarkersVM.infoWindow.show = true;
            });
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

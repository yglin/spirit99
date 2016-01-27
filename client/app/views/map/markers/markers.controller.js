(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MarkersController', MarkersController);

    MarkersController.$inject = ['$scope', 'CONFIG', 'ChannelManager', 'PostManager', 'IconManager', 'UserCtrls'];

    /* @ngInject */
    function MarkersController($scope, CONFIG, ChannelManager, PostManager, IconManager, UserCtrls) {
        var markersVM = this;
        markersVM.title = 'MarkersController';
        markersVM.markers = [];
        markersVM.options = {};
        markersVM.refresh = refresh;
        markersVM.rebuildMarkers = rebuildMarkers;
        markersVM.activate = activate;

        //////////////// Event Handlers ///////////////////
        markersVM.handlerDragend = handlerDragend;

        markersVM.activate();


        function activate() {
            // In development we need the DOMs of markers to do some test
            if(CONFIG.env && CONFIG.env === 'development'){
                markersVM.options.optimized = false;
            }
            else{
                markersVM.options.optimized = true;
            }
    
            // Start listening to events
            $scope.$on('map:dragend', markersVM.handlerDragend);
            
            // Load markers at the begining when map tiles loaded
            var unbindTilesLoded = $scope.$on('map:tilesloaded', function (event, mapModel) {
                markersVM.refresh(mapModel);
                // One-time callback
                unbindTilesLoded();                
            });
        }

        function refresh (mapModel) {
            var postMeta = ChannelManager.getPostMeta(UserCtrls.tunedInChannel, UserCtrls.selectedPost);
            var iconObjects = IconManager.getIconObjects(postMeta);
            PostManager.promiseLoadPosts(postMeta, mapModel.bounds).then(function (posts) {
                markersVM.rebuildMarkers(posts, iconObjects);
                $scope.$emit('markers:refresh', markersVM.markers);
            });
        }

        function rebuildMarkers (posts, iconObjects, options) {
            options = typeof options === 'undefined' ? {} : options;
            options.markers = typeof options.markers === 'undefined' ? markersVM.markers : options.markers;
            options.markers.length = 0;
            for (var i = 0; i < posts.length; i++) {
                var marker = posts[i];
                if(!marker.markerized){
                    if(marker.category && marker.category in iconObjects){
                        marker.iconObject = iconObjects[marker.category];
                    }
                    marker.markerized = true;
                }
                options.markers.push(marker);
            }
        }

        function handlerDragend (event, mapModel) {
            markersVM.refresh(mapModel);
        }

    }
})();
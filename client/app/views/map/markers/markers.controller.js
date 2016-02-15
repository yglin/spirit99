(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MarkersController', MarkersController);

    MarkersController.$inject = ['$scope', 'CONFIG', 'DEFAULTS', 'uiGmapGoogleMapApi', 'ChannelManager', 'PostManager', 'IconManager', 'UserCtrls'];

    /* @ngInject */
    function MarkersController($scope, CONFIG, DEFAULTS, uiGmapGoogleMapApi, ChannelManager, PostManager, IconManager, UserCtrls) {
        var markersVM = this;
        markersVM.title = 'MarkersController';
        markersVM.markers = [];
        // markersVM.options = {};
        markersVM.iconObjects = {};
        markersVM.gMapApi = null;
        markersVM.refresh = refresh;
        markersVM.rebuildMarkers = rebuildMarkers;
        markersVM.activate = activate;

        //////////////// Event Handlers ///////////////////
        markersVM.handlerSearchChanged = handlerSearchChanged;
        markersVM.handlerDragend = handlerDragend;
        markersVM.handlerChannelChanged = handlerChannelChanged;

        markersVM.activate();

        function activate() {
            // Wait until Google Maps API - google.maps object is available
            uiGmapGoogleMapApi.then(function (google_maps) {
                markersVM.gMapApi = google_maps;

                // Start listening to events
                $scope.$on('map:dragend', markersVM.handlerDragend);
                $scope.$on('search:changed', markersVM.handlerSearchChanged);
                $scope.$on('channel:changed', markersVM.handlerChannelChanged);
                
                // Load markers at the begining when map tiles loaded
                var unbindTilesLoded = $scope.$on('map:tilesloaded', function (event) {
                    markersVM.refresh();
                    // One-time callback
                    unbindTilesLoded();                
                });
            });
        }

        function refresh () {
            console.log(UserCtrls.map);
            var postMeta = ChannelManager.getPostMeta(UserCtrls.tunedInChannelID, UserCtrls.selectedPost);
            PostManager.promiseLoadPosts(postMeta, UserCtrls.map.bounds).then(function (posts) {
                markersVM.rebuildMarkers(posts);
                $scope.$emit('markers:refresh', markersVM.markers);
            });
        }

        function handlerDragend (event) {
            markersVM.refresh();
        }

        function handlerChannelChanged (event) {
            markersVM.refresh();
        }

        function handlerSearchChanged () {
            // console.log('I\'m called');
            for (var i = 0; i < markersVM.markers.length; i++) {
                // console.log(markersVM.markers[i].matchSearch);
                markersVM.markers[i].options.visible = markersVM.markers[i].matchSearch;
            }
        }

        function rebuildMarkers (posts) {
            markersVM.markers.length = 0;
            for (var i = 0; i < posts.length; i++) {
                var marker = posts[i];
                if(!marker.markerized){
                    if(!marker.category || !(marker.category in ChannelManager.categories)){
                        marker.category = 'misc';
                    }
                    marker.icon = getIcon(posts[i]);
                    marker.options = {};
                    marker.options.visible = posts[i].matchSearch;

                    // In development we need the DOMs of markers to do some test
                    if(CONFIG.env && CONFIG.env === 'development'){
                        marker.options.optimized = false;
                    }
                    else{
                        marker.options.optimized = true;
                    }
            
                    // console.log(marker.icon);
                    marker.markerized = true;
                }
                markersVM.markers.push(marker);
            }
        }

        function getIcon (post) {
            if(post.category){
                if(post.category in markersVM.iconObjects){
                    return markersVM.iconObjects[post.category];
                }
                else{
                    var categories = ChannelManager.getCategories(UserCtrls.tunedInChannelID);
                    // console.log(categories);
                    if(post.category in categories && categories[post.category].icon){
                        markersVM.iconObjects[post.category] = buildIconObject(categories[post.category].icon);
                        return markersVM.iconObjects[post.category];
                    }
                    else{
                        return null;
                    }
                }
            }
            else{
                return null;
            }            
        }

        function buildIconObject (iconData) {
            var iconObject = angular.copy(DEFAULTS.iconObject);
            if(typeof iconData === 'string'){
                iconObject.url = iconData;
            }
            else if(typeof iconData === 'object'){
                angular.extend(iconObject, iconData);
            }
            if(markersVM.gMapApi){
                for(var key in iconObject){
                    if(typeof iconObject[key] === 'object'){
                        if('x' in iconObject[key] && 'y' in iconObject[key]){
                            iconObject[key] = new markersVM.gMapApi.Point(iconObject[key].x, iconObject[key].y);
                        }
                        else if('width' in iconObject[key] && 'height' in iconObject[key]){
                            iconObject[key] = new markersVM.gMapApi.Size(iconObject[key].width, iconObject[key].height);
                        }                        
                    }
                }                
            }
            return iconObject;
        }
    }
})();
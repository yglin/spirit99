(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MarkersController', MarkersController);

    MarkersController.$inject = ['$scope', 'CONFIG', 'StationManager', 'ResourceManager', 'IconManager', 'UserCtrls'];

    /* @ngInject */
    function MarkersController($scope, CONFIG, StationManager, ResourceManager, IconManager, UserCtrls) {
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
            var resourceMeta = StationManager.getResourceMeta(UserCtrls.selectedStation, UserCtrls.selectedResource);
            var iconObjects = IconManager.getIconObjects(resourceMeta);
            ResourceManager.promiseLoadResources(resourceMeta, mapModel.bounds).then(function (resources) {
                markersVM.rebuildMarkers(resources, iconObjects);
            });
        }

        function rebuildMarkers (resources, iconObjects, options) {
            options = typeof options === 'undefined' ? {} : options;
            options.markers = typeof options.markers === 'undefined' ? markersVM.markers : options.markers;
            options.markers.length = 0;
            for (var i = 0; i < resources.length; i++) {
                var marker = resources[i];
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
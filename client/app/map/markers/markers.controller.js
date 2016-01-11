(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MarkersController', MarkersController);

    MarkersController.$inject = ['$scope', 'CONFIG', 'StationManager', 'SpiritManager', 'IconManager', 'UserCtrls'];

    /* @ngInject */
    function MarkersController($scope, CONFIG, StationManager, SpiritManager, IconManager, UserCtrls) {
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
            var spiritMeta = StationManager.getSpiritMeta(UserCtrls.selectedStation, UserCtrls.selectedSpirit);
            var iconObjects = IconManager.getIconObjects(spiritMeta);
            SpiritManager.promiseLoadSpirits(spiritMeta, mapModel.bounds).then(function (spirits) {
                markersVM.rebuildMarkers(spirits, iconObjects);
            });
        }

        function rebuildMarkers (spirits, iconObjects, options) {
            options = typeof options === 'undefined' ? {} : options;
            options.markers = typeof options.markers === 'undefined' ? markersVM.markers : options.markers;
            options.markers.length = 0;
            for (var i = 0; i < spirits.length; i++) {
                var marker = spirits[i];
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
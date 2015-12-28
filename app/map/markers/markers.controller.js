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

        markersVM.activate();

        //////////////// Event Handlers ///////////////////         

        //////////////// Utility Functions ////////////////

        function activate() {
            if(CONFIG.env && CONFIG.env === 'development'){
                markersVM.options.optimized = false;
            }
            else{
                markersVM.options.optimized = true;
            }
            markersVM.refresh();
        }

        function refresh () {
            var resourceMeta = StationManager.getResourceMeta(UserCtrls.selectedStation, UserCtrls.selectedResource);
            var iconObjects = IconManager.getIconObjects(resourceMeta);
            var unbindTilesLoded = $scope.$on('map:tilesloaded', function (event, mapData) {
                ResourceManager.promiseLoadResources(resourceMeta, mapData.bounds).then(function (resources) {
                    markersVM.rebuildMarkers(resources, iconObjects);
                });
                // One-time callback
                unbindTilesLoded();                
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
            };
        };

    }
})();
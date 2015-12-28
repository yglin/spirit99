(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('MapController', MapController);

    MapController.$inject = ['$scope', 'initMapArea'];

    /* @ngInject */
    function MapController($scope, initMapArea) {
        var mapVM = this;
        mapVM.title = 'MapController';
        mapVM.map = getInitialMap();
        mapVM.map.bounds = {};
        // Event handlers
        mapVM.handlerTilesLoaded = handlerTilesLoaded;
        mapVM.handlerDragend = handlerDragend;
        mapVM.events = {
            'tilesloaded': mapVM.handlerTilesLoaded,
            'dragend': mapVM.handlerDragend
        };


        activate();

        //////////////// Event Handlers ///////////////////
        function handlerTilesLoaded (mapObject, eventName) {
            $scope.$broadcast('map:' + eventName, mapVM.map);
            // console.debug('tiles loaded~!!');
        }
        
        function handlerDragend (mapObject, eventName) {
            // console.debug(eventName);
            $scope.$broadcast('map:' + eventName, mapVM.map);
        }

        //////////////// Utility Functions ////////////////

        function activate () {
        }

        function getInitialMap () {
            return {
                center: initMapArea.center,
                zoom: initMapArea.zoom
            };
        }
    }
})();

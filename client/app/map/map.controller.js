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
        mapVM.propagateMapEvent = propagateMapEvent;
        mapVM.events = {
            'tilesloaded': mapVM.propagateMapEvent,
            'dragend': mapVM.propagateMapEvent
        };


        activate();

        //////////////// Event Handlers ///////////////////
        // General map event propagation
        function propagateMapEvent(mapObject, eventName){
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

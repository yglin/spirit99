(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('MapController', MapController);

    MapController.$inject = ['$scope', 'Map'];

    /* @ngInject */
    function MapController($scope, Map) {
        var mapVM = this;
        mapVM.title = 'MapController';
        mapVM.mapIsReady = false;

        // Map events
        mapVM.events = {
            'idle': Map.broadcastEvent,
            'click': Map.broadcastEvent,
            'dragstart': Map.broadcastEvent,
            'dragend': Map.broadcastEvent,
            // 'drag': Map.broadcastEvent
            'bounds_changed': Map.broadcastEvent,
            'zoom_changed': Map.broadcastEvent
        };
        // // Publish-Subscribe events
        // $scope.$on('markers:refresh', handlerMarkersRefresh);
        // // UI controlls
        // mapVM.openPostList = openPostList;

        activate();

        function activate () {
            Map.prmsGetInitMap().then(function () {
                mapVM.map = Map.map;
            });

            var stopListenMapIdle = $scope.$on('map:idle', function () {
                mapVM.mapIsReady = true;
                stopListenMapIdle();
            })
        }
    }
})();

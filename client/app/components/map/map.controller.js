(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('MapController', MapController);

    MapController.$inject = ['Map', 'CONFIG'];

    /* @ngInject */
    function MapController(Map, CONFIG) {
        var mapVM = this;
        mapVM.title = 'MapController';
        mapVM.debug = CONFIG.debug;
        // Map events
        mapVM.events = {
            'idle': Map.broadcastEvent,
            'click': Map.broadcastEvent,
            'dragstart': Map.broadcastEvent,
            'dragend': Map.broadcastEvent,
            // 'drag': Map.broadcastEvent
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
        }

        //////////////// Custom Event Handlers ///////////////////
        // function handlerMarkersRefresh (eventName, markers) {
        //     if(markers.length >= CONFIG.MIN_POSTS_FOR_LIST){
        //         mapVM.showListButton = true;
        //     }
        //     else{
        //         mapVM.showListButton = false;                
        //     }
        // };

        // function handlerDragStart (mapObject, eventName) {
        //     // options = typeof options === 'undefined' ? {} : options;
        //     // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
        //     mapVM.isDragging = true;
        // }

        // function handlerDragEnd (mapObject, eventName) {
        //     mapVM.isDragging = false;
        //     broadcastMapEvent(mapObject, eventName);
        // }

        //////////////// Utility Functions ////////////////

        // function locate(event) {
        //     $mdDialog.show({
        //         templateUrl: 'app/views/locater/locater.tpl.html',
        //         controller: 'LocaterController',
        //         controllerAs: 'locaterVM',
        //         targetEvent: event,
        //         clickOutsideToClose:true
        //     });
        // }

        // function getInitialMap () {
        //     return {
        //         center: initMapArea.center,
        //         zoom: initMapArea.zoom
        //     };
        // }

        // function openPostList() {
        //     // UserCtrls.selectedSidenav = 'post-list';
        //     $mdSidenav('sidenav-main').open();
        // }
    }
})();

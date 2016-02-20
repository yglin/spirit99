(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('MapController', MapController);

    MapController.$inject = ['$rootScope', '$log', 'Map'];

    /* @ngInject */
    function MapController($rootScope, $log, Map) {
        var mapVM = this;
        mapVM.title = 'MapController';
        // mapVM.map = Map.map;
        // mapVM.isDragging = false;
        // mapVM.showListButton = false;
        // mapVM.locate = locate;
        // Map events
        mapVM.events = {
            'idle': broadcastMapEvent,
            // 'dragstart': handlerDragStart,
            // 'dragend': handlerDragEnd,
        };
        // // Publish-Subscribe events
        // $scope.$on('markers:refresh', handlerMarkersRefresh);
        // // UI controlls
        // mapVM.openPostList = openPostList;

        activate();

        function activate () {
            Map.prmsInitMap().then(function () {
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

        //////////////// Map Event Handlers ///////////////////
        // Do nothing but broadcast map event
        function broadcastMapEvent(mapObject, eventName){
            $log.debug(eventName);
            $rootScope.$broadcast('map:' + eventName, mapVM.map);            
        }

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

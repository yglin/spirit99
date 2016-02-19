(function() {
    'use strict';

    angular
    .module('spirit99')
    .controller('MapController', MapController);

    MapController.$inject = [];

    /* @ngInject */
    function MapController() {
        var mapVM = this;
        mapVM.title = 'MapController';
        // mapVM.map = Map.map;
        // mapVM.isDragging = false;
        // mapVM.showListButton = false;
        // mapVM.locate = locate;
        // Map events
        // mapVM.events = {
        //     'tilesloaded': broadcastMapEvent,
        //     'dragstart': handlerDragStart,
        //     'dragend': handlerDragEnd,
        // };
        // // Publish-Subscribe events
        // $scope.$on('markers:refresh', handlerMarkersRefresh);
        // // UI controlls
        // mapVM.openPostList = openPostList;

        activate();

        function activate () {
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

        // //////////////// Map Event Handlers ///////////////////
        // // Do nothing but broadcast map event
        // function broadcastMapEvent(mapObject, eventName){
        //     $scope.$broadcast('map:' + eventName, mapVM.map);            
        // }

        // function handlerDragStart (mapObject, eventName) {
        //     // options = typeof options === 'undefined' ? {} : options;
        //     // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
        //     mapVM.isDragging = true;
        // }

        // function handlerDragEnd (mapObject, eventName) {
        //     // options = typeof options === 'undefined' ? {} : options;
        //     // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
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

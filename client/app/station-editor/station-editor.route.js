(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(StationEditorRouter);

    StationEditorRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function StationEditorRouter($routeProvider){
        $routeProvider.when('/station-editor', {
            templateUrl: 'app/station-editor/station-editor.html',
            controller: 'StationEditorController',
            controllerAs: 'stationEditorVM'
        });        
    }

})();
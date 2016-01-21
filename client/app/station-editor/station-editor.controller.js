(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('StationEditorController',StationEditorController);

    StationEditorController.$inject = ['$scope', 'StationManager'];

    /* @ngInject */
    function StationEditorController($scope, StationManager) {
        var stationEditorVM = this;
        stationEditorVM.title = 'StationEditor';

        activate();

        ////////////////

        function activate() {
        }
    }
})();
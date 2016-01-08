(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope', 'StationManager'];

    /* @ngInject */
    function ToolbarController($scope, StationManager) {
        var toolbarVM = this;
        toolbarVM.title = 'Toolbar';
        toolbarVM.station = {};

        activate();

        ////////////////

        function activate() {
            toolbarVM.station = StationManager.getStation();
        }
    }
})();
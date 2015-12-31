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
        toolbarVM.stationTitle = '請選擇電台';

        activate();

        ////////////////

        function activate() {
            var stationTitle = StationManager.getTitle();
            if(stationTitle){
                toolbarVM.stationTitle = stationTitle;
            }
        }
    }
})();
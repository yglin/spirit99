(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope', '$location', 'StationManager'];

    /* @ngInject */
    function ToolbarController($scope, $location, StationManager) {
        var toolbarVM = this;
        toolbarVM.title = 'Toolbar';
        toolbarVM.viewButtons = {
            'stations': {
                icon: 'radio',
                viewPath: 'stations',
                hide: false
            },
            'map': {
                icon: 'map',
                viewPath: 'map',
                hide: false
            },
            'search': {
                icon: 'search',
                viewPath: 'search',
                hide: false
            },
            'settings': {
                icon: 'settings',
                viewPath: 'settings',
                hide: false
            }
        };
        toolbarVM.station = {};
        toolbarVM.gotoView = gotoView;

        activate();

        ////////////////

        function activate() {
            toolbarVM.station = StationManager.getStation();
            hideCurrentViewButton();
        }

        function gotoView (viewPath) {
            $location.path(viewPath);
            hideCurrentViewButton();
        }

        function hideCurrentViewButton () {
            for(var key in toolbarVM.viewButtons){
                if(('/' + toolbarVM.viewButtons[key].viewPath) === $location.path()){
                    toolbarVM.viewButtons[key].hide = true;
                }
                else{
                    toolbarVM.viewButtons[key].hide = false;
                }
            }
        }
    }
})();
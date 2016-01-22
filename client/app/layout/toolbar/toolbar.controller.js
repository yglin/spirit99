(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope', '$location', '$mdSidenav', '$log', 'ChannelManager'];

    /* @ngInject */
    function ToolbarController($scope, $location, $mdSidenav, $log, ChannelManager) {
        var toolbarVM = this;
        toolbarVM.title = 'Toolbar';
        toolbarVM.viewButtons = {
            'channels': {
                icon: 'radio',
                viewPath: 'channels',
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
        toolbarVM.channel = {};
        toolbarVM.gotoView = gotoView;
        toolbarVM.readonly = false;
        toolbarVM.keywords = [];
        toolbarVM.toggleSidenav = toggleSidenav;

        activate();

        ////////////////

        function activate() {
            toolbarVM.channel = ChannelManager.getChannel();
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

        function toggleSidenav (componentID, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            $mdSidenav(componentID)
            .toggle();
            // .then(function () {
            //     $log.debug("toggle " + componentID + " is done");
            // });
        }
    }
})();
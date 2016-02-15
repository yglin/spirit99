(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope', '$location', '$mdSidenav', '$log', 'UserCtrls', 'ChannelManager'];

    /* @ngInject */
    function ToolbarController($scope, $location, $mdSidenav, $log, UserCtrls, ChannelManager) {
        var toolbarVM = this;
        toolbarVM.title = 'Toolbar';
        // toolbarVM.viewButtons = {
        //     'channels': {
        //         icon: 'radio',
        //         viewPath: 'channels',
        //         hide: false
        //     },
        //     'map': {
        //         icon: 'map',
        //         viewPath: 'map',
        //         hide: false
        //     },
        //     'search': {
        //         icon: 'search',
        //         viewPath: 'search',
        //         hide: false
        //     },
        //     'settings': {
        //         icon: 'settings',
        //         viewPath: 'settings',
        //         hide: false
        //     }
        // };
        toolbarVM.channel = {};
        toolbarVM.gotoView = gotoView;
        toolbarVM.readonly = false;
        toolbarVM.keywords = [];
        toolbarVM.openSidenav = openSidenav;

        $scope.$on('channel:changed', function (event, channelID) {
            toolbarVM.channel = ChannelManager.getChannel(channelID);
        });

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

        function openSidenav (sidenavName) {
            UserCtrls.selectedSidenav = sidenavName;
            $mdSidenav('sidenav-main').open();
        }
    }
})();
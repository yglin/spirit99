(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope', 'Channel', 'Sidenav'];

    /* @ngInject */
    function ToolbarController($scope, Channel, Sidenav) {
        var toolbarVM = this;
        // toolbarVM.title = 'Toolbar';
        toolbarVM.channel = Channel.getTunedInChannel();
    //     toolbarVM.gotoView = gotoView;
    //     toolbarVM.readonly = false;
    //     toolbarVM.keywords = [];
        toolbarVM.openSidenav = Sidenav.open;

        $scope.$on('channel:tuned', function () {
            toolbarVM.channel = Channel.getTunedInChannel();
        });

    //     activate();

    //     ////////////////

    //     function activate() {
    //         toolbarVM.channel = ChannelManager.getChannel(UserCtrls.tunedInChannelID);
    //         hideCurrentViewButton();
    //     }

    //     function gotoView (viewPath) {
    //         $location.path(viewPath);
    //         hideCurrentViewButton();
    //     }

    //     function hideCurrentViewButton () {
    //         for(var key in toolbarVM.viewButtons){
    //             if(('/' + toolbarVM.viewButtons[key].viewPath) === $location.path()){
    //                 toolbarVM.viewButtons[key].hide = true;
    //             }
    //             else{
    //                 toolbarVM.viewButtons[key].hide = false;
    //             }
    //         }
    //     }

    }
})();
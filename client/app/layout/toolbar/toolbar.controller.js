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
        toolbarVM.channel = Channel.getChannel();
        toolbarVM.openSidenav = Sidenav.open;

        $scope.$on('channel:tuned', function () {
            toolbarVM.channel = Channel.getChannel();
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


    }
})();
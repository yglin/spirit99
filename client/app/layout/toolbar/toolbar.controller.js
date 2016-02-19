(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope'];

    /* @ngInject */
    function ToolbarController($scope) {
        var toolbarVM = this;
        toolbarVM.title = 'Toolbar';
    //     toolbarVM.channel = {};
    //     toolbarVM.gotoView = gotoView;
    //     toolbarVM.readonly = false;
    //     toolbarVM.keywords = [];
    //     toolbarVM.openSidenav = openSidenav;

    //     $scope.$on('channel:changed', function (event, channelID) {
    //         toolbarVM.channel = ChannelManager.getChannel(channelID);
    //     });

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

    //     function openSidenav (sidenavName) {
    //         UserCtrls.selectedSidenav = sidenavName;
    //         $mdSidenav('sidenav-main').open();
    //     }
    }
})();
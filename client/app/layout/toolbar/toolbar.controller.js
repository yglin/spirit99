(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope', 'Sidenav'];

    /* @ngInject */
    function ToolbarController($scope, Sidenav) {
        var toolbarVM = this;
        toolbarVM.title = 'Toolbar';
    //     toolbarVM.channel = {};
    //     toolbarVM.gotoView = gotoView;
    //     toolbarVM.readonly = false;
    //     toolbarVM.keywords = [];
        toolbarVM.open = Sidenav.open;

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

    }
})();
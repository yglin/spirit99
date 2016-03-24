(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$scope', '$timeout', 'Channel', 'Sidenav'];

    /* @ngInject */
    function ToolbarController($scope, $timeout, Channel, Sidenav) {
        var toolbarVM = this;
        // toolbarVM.title = 'Toolbar';
        toolbarVM.isLoading = false;
        toolbarVM.channel = Channel.getChannel();
        toolbarVM.openSidenav = Sidenav.open;

        activate();

        function activate() {

            $scope.$on('channel:tuned', function () {
                toolbarVM.channel = Channel.getChannel();
            });
            $scope.$on('progress:start', function () {
                toolbarVM.isLoading = true;
            });
            $scope.$on('progress:end', function () {
                // toggle isLoading after current digest cycle
                $timeout(function () {
                    toolbarVM.isLoading = false;                    
                }, 0);
            });
            // $scope.$on('post:loadStart', function () {
            //     toolbarVM.isLoading = true;                    
            // });
            // $scope.$on('locator:locateStart', function () {
            //     toolbarVM.isLoading = true;                    
            // });
            // $scope.$on('post:loadEnd', function () {
            //     // toggle isLoading after current digest cycle
            //     $timeout(function () {
            //         toolbarVM.isLoading = false;                    
            //     }, 0);
            // });
            // $scope.$on('map:idle', function () {
            //     // toggle isLoading after current digest cycle
            //     $timeout(function () {
            //         toolbarVM.isLoading = false;                    
            //     }, 0);
            // });
            // $scope.$on('post:loadEnd', function () {
            //     $timeout(function () {
            //         toolbarVM.isLoading = false;                    
            //     }, 1000);
            // });
        }

    //     function gotoView (viewPath) {
    //         $location.path(viewPath);
    //         hideCurrentViewButton();
    //     }


    }
})();
(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('SidenavController',SidenavController);

    SidenavController.$inject = ['$scope', 'Sidenav'];

    /* @ngInject */
    function SidenavController($scope, Sidenav) {
        var sidenavVM = this;
        sidenavVM.title = 'Sidenav';
        sidenavVM.ctrl = Sidenav;
        sidenavVM.tabs = Sidenav.panels;

        activate();

        ////////////////

        function activate() {
        }
    }
})();

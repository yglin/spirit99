(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MenuController',MenuController);

    MenuController.$inject = ['$scope', '$mdSidenav'];

    /* @ngInject */
    function MenuController($scope, $mdSidenav) {
        var menuVM = this;
        menuVM.title = 'Menu';
        menuVM.openSidenav = openSidenav;

        activate();

        ////////////////

        function activate() {
        }

        function openSidenav (componentID, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            $mdSidenav('sidenav-menu').close()
            .then(function () {
                $mdSidenav(componentID)
                .open();        
            });
            // .then(function () {
            //     $log.debug("toggle " + componentID + " is done");
            // });
        }
    }
})();
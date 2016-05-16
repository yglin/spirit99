(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MainController',MainController);

    MainController.$inject = ['$scope', 'CONFIG', 'DEFAULTS'];

    /* @ngInject */
    function MainController($scope, CONFIG, DEFAULTS) {
        var $ctrl = this;
        $ctrl.title = 'Main';
        $ctrl.debug = CONFIG.debug;

        activate();

        ////////////////

        function activate() {
        }
    }
})();

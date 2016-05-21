(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MainController',MainController);

    MainController.$inject = ['$scope', 'CONFIG'];

    /* @ngInject */
    function MainController($scope, CONFIG) {
        var $ctrl = this;
        $ctrl.title = 'Main';
        $ctrl.debug = CONFIG.DEBUG;

        activate();

        ////////////////

        function activate() {
        }
    }
})();

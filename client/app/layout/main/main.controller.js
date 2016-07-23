(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MainController',MainController);

    MainController.$inject = ['$scope', 'CONFIG', 'Tutor', 'PostViewer'];

    /* @ngInject */
    function MainController($scope, CONFIG, Tutor, PostViewer) {
        var $ctrl = this;
        $ctrl.title = 'Main';
        $ctrl.debug = CONFIG.DEBUG;

        activate();

        ////////////////

        function activate() {
        }
    }
})();

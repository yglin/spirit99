(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('MainController',MainController);

    MainController.$inject = ['$scope', 'DEFAULTS'];

    /* @ngInject */
    function MainController($scope, DEFAULTS) {
        var mainVM = this;
        mainVM.title = 'Main';

        activate();

        ////////////////

        function activate() {
        }
    }
})();

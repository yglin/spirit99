(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('LocatorGadgetController', LocatorGadgetController);

    LocatorGadgetController.$inject = ['Locator'];

    /* @ngInject */
    function LocatorGadgetController(Locator) {
        var locatorGadgetVM = this;    
        locatorGadgetVM.title = 'LocatorGadget';
        locatorGadgetVM.locator = Locator;

        activate();

        ////////////////

        function activate() {
        }
    }
})();
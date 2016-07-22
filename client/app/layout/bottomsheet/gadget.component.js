/*
* @Author: yglin
* @Date:   2016-07-20 20:22:33
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-22 10:16:35
*/

(function() {
    'use strict';

    angular.module('spirit99')
    .component('s99BottomsheetGadget',{
        templateUrl: 'app/layout/bottomsheet/gadget.tpl.html',
        controller: GadgetController,
        bindings: {
        }
    });

    GadgetController.$inject = ['$mdBottomSheet'];

    /* @ngInject */
    function GadgetController($mdBottomSheet) {
        var $ctrl = this;

        $ctrl.showBottomsheet = showBottomsheet;

        $ctrl.$onInit = function () {
        };

        function showBottomsheet() {
            $mdBottomSheet.show({
                templateUrl: 'app/layout/bottomsheet/bottomsheet.tpl.html',
                controller: 'BottomsheetController',
                clickOutsideToClose: true,
                // disableBackdrop: true,
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {}
            });
        }
    }
})();

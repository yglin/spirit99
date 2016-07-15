(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('DialogConfirmController', DialogConfirmController);

    DialogConfirmController.$inject = ['$mdDialog'];

    /* @ngInject */
    function DialogConfirmController($mdDialog) {
        var $ctrl = this;
        $ctrl.cancel = cancel;
        $ctrl.confirm = confirm;

        activate();

        ////////////////

        function activate() {
            if (!$ctrl.buttons) {
                $ctrl.buttons = {};
            }
            if (!$ctrl.buttons.confirm) {
                $ctrl.buttons.confirm = '確定';
            }
        }

        function cancel () {
            $mdDialog.cancel();
        }

        function confirm (response) {
            $mdDialog.hide(response);
        }
    }
})();

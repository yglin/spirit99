(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('DialogConfirmController',DialogConfirmController);

    DialogConfirmController.$inject = ['$mdDialog'];

    /* @ngInject */
    function DialogConfirmController($mdDialog) {
        var dialogConfirmVM = this;
        dialogConfirmVM.cancel = cancel;
        dialogConfirmVM.confirm = confirm;

        activate();

        ////////////////

        function activate() {
        }

        function cancel () {
            $mdDialog.cancel();
        }

        function confirm (response) {
            $mdDialog.hide(response);
        }
    }
})();

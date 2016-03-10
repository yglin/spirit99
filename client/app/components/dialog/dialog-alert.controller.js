(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('DialogAlertController', DialogAlertController);

    DialogAlertController.$inject = ['$mdDialog'];

    /* @ngInject */
    function DialogAlertController($mdDialog) {
        var dialogAlertVM = this;
        dialogAlertVM.cancel = cancel;
        dialogAlertVM.confirm = confirm;

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

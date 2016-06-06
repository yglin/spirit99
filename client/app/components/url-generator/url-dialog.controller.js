/*
* @Author: yglin
* @Date:   2016-06-06 13:54:44
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-06 14:52:39
*/

(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('UrlDialogController', UrlDialogController);

    UrlDialogController.$inject = ['$mdDialog', 'clipboard'];

    /* @ngInject */
    function UrlDialogController($mdDialog, clipboard) {
        var $ctrl = this;
        $ctrl.title = '產生檢視網址';
        $ctrl.cancel = cancel;
        $ctrl.copyToClipboard = copyToClipboard;
        $ctrl.copyToClipboardSupport = clipboard.supported;

        activate();

        ////////////////

        function activate() {
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function copyToClipboard() {
            clipboard.copyText($ctrl.url);
            $ctrl.copied = true;
        }
    }
})();

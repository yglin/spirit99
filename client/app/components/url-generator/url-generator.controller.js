/*
* @Author: yglin
* @Date:   2016-06-06 13:44:25
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-06 14:03:16
*/

(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('UrlGeneratorController', UrlGeneratorController);

    UrlGeneratorController.$inject = ['UrlGenerator', '$mdDialog'];

    /* @ngInject */
    function UrlGeneratorController(UrlGenerator, $mdDialog) {
        var $ctrl = this;
        $ctrl.generate = generate;

        activate();

        ////////////////

        function activate() {
        }

        function generate() {
            var url = UrlGenerator.generate();
            $mdDialog.show({
                controller: 'UrlDialogController',
                templateUrl: 'app/components/url-generator/url-dialog.tpl.html',
                parent: angular.element(document.body),
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose:true,
                locals: {
                    url: url,
                }                
            });
        }
    }
})();

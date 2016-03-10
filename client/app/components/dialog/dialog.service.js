(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Dialog', Dialog);

    Dialog.$inject = ['$q', '$log', '$mdDialog'];

    /* @ngInject */
    function Dialog($q, $log, $mdDialog) {
        var self = this;
        self.confirm = confirm;
        self.alert = alert;

        ////////////////

        function confirm(title, desc) {
            if(!(title && desc)){
                $log.warn('Confirm Dialog needs title and description');
                return $q.reject('Confirm Dialog needs title and description');
            }
            return $mdDialog.show({
                controller: 'DialogConfirmController',
                templateUrl: 'app/components/dialog/dialog-confirm.tpl.html',
                parent: angular.element(document.body),
                controllerAs: 'dialogConfirmVM',
                bindToController: true,
                clickOutsideToClose:true,
                locals: {
                    title: title,
                    description: desc
                }
            });
        }

        function alert(title, desc) {
            if(!(title && desc)){
                $log.warn('Alert Dialog needs title and description');
                return $q.reject('Alert Dialog needs title and description');
            }
            return $mdDialog.show({
                controller: 'DialogAlertController',
                templateUrl: 'app/components/dialog/dialog-alert.tpl.html',
                parent: angular.element(document.body),
                controllerAs: 'dialogAlertVM',
                bindToController: true,
                clickOutsideToClose:true,
                locals: {
                    title: title,
                    description: desc
                }
            });
        }
    }
})();

/*
* @Author: yglin
* @Date:   2016-07-07 16:56:38
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-07 17:02:36
*/

(function() {
    'use strict';

    angular.module('spirit99')
    .component('s99TutorSettings',{
        templateUrl: 'app/components/tutor/settings.tpl.html',
        controller: TutorSettingsController,
        bindings: {
        }
    });

    TutorSettingsController.$inject = ['Tutor'];

    /* @ngInject */
    function TutorSettingsController(Tutor) {
        var $ctrl = this;
        $ctrl.title = 'Settings';
        $ctrl.Tutor = Tutor;
        $ctrl.triggerTutors = triggerTutors;

        $ctrl.$onInit = function () {
        };

        function triggerTutors() {
            if ($ctrl.Tutor.on) {
                Tutor.turnOnTutors();
            }
            else {
                Tutor.turnOffTutors();
            }
        }
    }
})();

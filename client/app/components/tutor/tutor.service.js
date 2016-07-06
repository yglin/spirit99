/*
* @Author: yglin
* @Date:   2016-07-05 19:49:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-06 16:52:46
*/

(function() {
    'use strict';

    angular
    .module('spirit99')
    .service('Tutor', Tutor);

    Tutor.$inject = ['$rootScope', '$mdToast', 'localStorageService'];

    /* @ngInject */
    function Tutor($rootScope, $mdToast, localStorage) {
        var self = this;
        self.on = localStorage.get('show-tutors');
        self.toast = toast;
        self.listeners = [];

        activate();

        ////////////////
        function activate() {
            if (self.on !== false) {
                self.on = true;
            }

            if (self.on) {
                registerTutors();
            }
        }

        function registerTutors() {
            self.listeners.push($rootScope.$on('map:idle', function () {
                self.toast('create-post', 'bottom left');
            }));
        }

        function toast(tutorName, position) {
            if (self.on && tutorName) {
                var templateUrl = 'app/components/tutor/' + tutorName + '.tpl.html';
                position = typeof position === 'undefined' ? 'bottom left' : position;
                $mdToast.show({
                    templateUrl: templateUrl,
                    position: position
                });
                // $mdToast.show($mdToast.simple().textContent('Simple Toast!'));
            }
        }
    }
})();

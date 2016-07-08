/*
* @Author: yglin
* @Date:   2016-07-05 19:49:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-08 10:32:59
*/

(function() {
    'use strict';

    angular
    .module('spirit99')
    .service('Tutor', Tutor)
    .controller('TutorController', TutorController);

    Tutor.$inject = ['$q', '$rootScope', '$mdToast', 'localStorageService'];

    /* @ngInject */
    function Tutor($q, $rootScope, $mdToast, localStorage) {
        var self = this;
        self.on = localStorage.get('show-tutors');
        self.lastTutor = {};
        self.listeners = [];
        self.turnOffButton = '<span flex></span><md-button class="md-icon-button" ng-click="$ctrl.turnOffTutors()"><md-icon class="material-icons" style="color:white;">close</md-icon></md-button>';
        self.tutors = {};

        self.toast = toast;
        self.turnOnTutors = turnOnTutors;
        self.turnOffTutors = turnOffTutors;

        activate();

        ////////////////
        function activate() {
            self.tutors = {
                'create-post': {
                    template: '在地圖上點一下新增文章'
                },
                'search-by-address': {
                    template: '點<md-icon class="material-icons">my_location</md-icon>可以搜尋地址或地名',
                    position: 'top right'
                },
                'show-post-list': {
                    template: '選單中的<md-icon class="material-icons">list_view</md-icon>可檢視文章清單',
                    position: 'top right'
                }
            }

            if (self.on !== false) {
                self.on = true;
            }

            if (self.on) {
                var registerTutorsOnceMapReady = $rootScope.$on('map:idle', function () {
                    registerTutors();
                    registerTutorsOnceMapReady();
                });
            }
        }

        function registerTutors() {
            deregisterTutors();

            self.listeners.push($rootScope.$on('channel:tuned', function (event, channel_id) {
                self.toast('create-post');
            }));

            self.listeners.push($rootScope.$on('map:bounds_changed', function () {
                self.toast('search-by-address');
            }));

            self.listeners.push($rootScope.$on('post:reload', function (event, posts) {
                if (posts.length > 0) {
                    self.toast('show-post-list');
                }
            }));
        }

        function deregisterTutors() {
            for (var i = 0; i < self.listeners.length; i++) {
                if (typeof self.listeners[i] === 'function') {
                    self.listeners[i]();
                }
            }
        }

        function turnOffTutors() {
            deregisterTutors();
            self.on = false;
            localStorage.set('show-tutors', self.on);
        }

        function turnOnTutors() {
            registerTutors();
            self.on = true;
            localStorage.set('show-tutors', self.on);
        }

        function toast(tutorID) {
            var tutor = self.tutors[tutorID];
            if (self.on && tutor && tutor.template) {
                var position = typeof tutor.position === 'undefined' ? 'bottom left' : tutor.position;
                var parent = typeof tutor.parent === 'undefined' ? angular.element(document.getElementById('main')) : tutor.parent;

                var toastObj = {
                    template: '<md-toast class="s99-toast">' + tutor.template + self.turnOffButton + '</md-toast>',
                    controller: 'TutorController',
                    bindToController: true,
                    controllerAs: '$ctrl',
                    position: position,
                    parent: parent
                };
                
                if (self.lastTutor.promise && self.lastTutor.promise.$$state.status === 0) {
                    if (self.lastTutor.id !== tutorID) {
                        self.lastTutor.id = tutorID;
                        self.lastTutor.promise = self.lastTutor.promise.then(function () {
                            return $mdToast.show(toastObj);
                        });                        
                    }
                }
                else {
                    self.lastTutor.id = tutorID;
                    self.lastTutor.promise = $mdToast.show(toastObj);
                }
            }
        }
    }

    TutorController.$injector = ['Tutor', 'Dialog', '$mdToast'];

    function TutorController(Tutor, Dialog, $mdToast) {
        var $ctrl = this;

        $ctrl.turnOffTutors = turnOffTutors;

        function turnOffTutors() {
            Dialog.confirm('關閉教學提示', '以後不再顯示教學提示？<br>可在設定<i class="material-icons">settings</i>中再打開')
            .then(function () {
                Tutor.turnOffTutors();
                $mdToast.hide();
            });
        }
    }
})();

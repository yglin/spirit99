/*
* @Author: yglin
* @Date:   2016-07-05 19:49:43
* @Last Modified by:   yglin
* @Last Modified time: 2016-07-08 13:12:48
*/

(function() {
    'use strict';

    angular
    .module('spirit99')
    .service('Tutor', Tutor)
    .controller('TutorController', TutorController);

    Tutor.$inject = ['$q', '$rootScope', '$timeout', '$mdToast', 'localStorageService', 'Channel'];

    /* @ngInject */
    function Tutor($q, $rootScope, $timeout, $mdToast, localStorage, Channel) {
        var self = this;
        self.on = localStorage.get('show-tutors');
        self.listeners = [];
        self.turnOffButton = '<span flex></span><md-button class="md-icon-button" ng-click="$ctrl.turnOffTutors()"><md-icon class="material-icons" style="color:white;">close</md-icon></md-button>';
        self.tutors = {};
        self.debounceWait = 20000;

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
                    template: '選單<md-icon class="material-icons">more_vert</md-icon><md-icon class="material-icons">keyboard_arrow_right</md-icon><md-icon class="material-icons">list_view</md-icon>可檢視文章清單',
                    position: 'top right'
                },
                'filter-posts': {
                    template: '選單<md-icon class="material-icons">more_vert</md-icon><md-icon class="material-icons">keyboard_arrow_right</md-icon><md-icon class="material-icons">search</md-icon>設定條件搜尋文章',
                    position: 'top left'
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

            self.listeners.push($rootScope.$on('map:idle', function (event) {
                if (Channel.tunedInChannelID) {
                    self.toast('create-post');
                }
            }));

            self.listeners.push($rootScope.$on('map:bounds_changed', function () {
                self.toast('search-by-address');
            }));

            self.listeners.push($rootScope.$on('post:reload', function (event, posts) {
                if (posts.length > 0) {
                    self.toast('show-post-list');
                }
                if (posts.length > 10) {
                    self.toast('filter-posts');
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
            if (!this.tutorPromises) {
                this.tutorPromises = {};
            }
            if (this.tutorPromises[tutorID] && (this.tutorPromises[tutorID].promise.$$state.status === 0 || this.tutorPromises[tutorID].debounce)) {
                return;
            }

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

                var tutorDefer;
                if (!this.tutorPromises[tutorID]) {
                    this.tutorPromises[tutorID] = {};
                }
                tutorDefer = this.tutorPromises[tutorID];
                
                if (this.lastTutorPromise) {
                    this.lastTutorPromise = tutorDefer.promise = this.lastTutorPromise.finally(function () {
                        return $mdToast.show(toastObj);
                    });
                }
                else {
                    this.lastTutorPromise = tutorDefer.promise = $mdToast.show(toastObj);
                }

                tutorDefer.debounce = true;
                $timeout(function () {
                    tutorDefer.debounce = false;
                }, self.debounceWait);
            }
        }
    }

    TutorController.$injector = ['Tutor', 'Dialog', '$mdToast'];

    function TutorController(Tutor, Dialog, $mdToast) {
        var $ctrl = this;

        $ctrl.turnOffTutors = turnOffTutors;

        function turnOffTutors() {
            Dialog.confirm('關閉教學提示', '以後不再顯示教學提示？<br>可在<b>選單<i class="material-icons">more_vert</i></b><i class="material-icons">keyboard_arrow_right</i><b>設定<i class="material-icons">settings</i></b>中再打開')
            .then(function () {
                Tutor.turnOffTutors();
                $mdToast.hide();
            });
        }
    }
})();

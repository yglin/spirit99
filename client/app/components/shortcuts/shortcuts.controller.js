(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ShortcutsController',ShortcutsController);

    ShortcutsController.$inject = ['$scope', 'Sidenav', 'Post', 'Locator'];

    /* @ngInject */
    function ShortcutsController($scope, Sidenav, Post, Locator) {
        var shortcutsVM = this;
        shortcutsVM.title = 'Shortcuts';
        shortcutsVM.buttons = {
            'open-locator': {
                domId: 's99-open-dialog-locator',
                show: true,
                icon: 'my_location',
                click: function () {
                    Locator.openDialog();
                }
            },
            'sidenav-posts': {
                domId: 's99-open-sidenav-posts',
                show: false,
                icon: 'view_list',
                click: function () {
                    Sidenav.open('posts');
                }
            }
        };

        activate();

        ////////////////

        function activate() {
            $scope.$on('post:loadEnd', function () {
                if (Post.posts.length >= 5) {
                    shortcutsVM.buttons['sidenav-posts'].show = true;
                }
                else {
                    shortcutsVM.buttons['sidenav-posts'].show = false;                    
                }
            });

            $scope.$on('map:dragstart', function () {
                shortcutsVM.buttons['open-locator'].show = false;
            });

            $scope.$on('map:drag', function () {
                shortcutsVM.buttons['open-locator'].show = false;
            });

            $scope.$on('map:dragend', function () {
                shortcutsVM.buttons['open-locator'].show = true;
            });

            $scope.$on('map:idle', function () {
                shortcutsVM.buttons['open-locator'].show = true;
            });
        }
    }
})();

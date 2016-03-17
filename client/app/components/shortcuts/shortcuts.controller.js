(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ShortcutsController',ShortcutsController);

    ShortcutsController.$inject = ['$scope', 'Sidenav', 'Post'];

    /* @ngInject */
    function ShortcutsController($scope, Sidenav, Post) {
        var shortcutsVM = this;
        shortcutsVM.title = 'Shortcuts';
        shortcutsVM.buttons = {
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
        }
    }
})();

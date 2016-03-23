(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('GadgetController', GadgetController);

    GadgetController.$inject = ['$scope', '$mdMedia', 'Sidenav', 'Post', 'Locator'];

    /* @ngInject */
    function GadgetController($scope, $mdMedia, Sidenav, Post, Locator) {
        var gadgetVM = this;
        gadgetVM.title = 'Gadget';
        gadgetVM.locator = Locator;
        gadgetVM.show = true;
        gadgetVM.buttons = {
            'open-locator': {
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
                    gadgetVM.buttons['sidenav-posts'].show = true;
                }
                else {
                    gadgetVM.buttons['sidenav-posts'].show = false;                    
                }
            });

            $scope.$on('map:dragstart', function () {
                if ($mdMedia('xs')) {
                    gadgetVM.show = false;                    
                }
            });

            // $scope.$on('map:drag', function () {
            //     gadgetVM.show = false;
            // });

            $scope.$on('map:dragend', function () {
                gadgetVM.show = true;
            });

            // $scope.$on('map:idle', function () {
            //     gadgetVM.show = true;
            // });
        }
    }
})();

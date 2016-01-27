(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('SidenavController',SidenavController);

    SidenavController.$inject = ['$scope', 'UserCtrls'];

    /* @ngInject */
    function SidenavController($scope, UserCtrls) {
        var sidenavVM = this;
        sidenavVM.title = 'Sidenav';
        sidenavVM.selectedTabIndex = 0;
        sidenavVM.tabs = {
            'channel-list': {
                icon: 'radio',
                templateUrl: 'app/views/channel-list/channel-list.tpl.html'
            },
            'post-list': {
                icon: 'list_view',
                templateUrl: 'app/views/post-list/post-list.tpl.html'
            },
            'search': {
                icon: 'search',
                templateUrl: 'app/views/search/search.tpl.html'
            },
            'bookmark': {
                icon: 'bookmark',
                templateUrl: 'app/views/bookmark/bookmark.tpl.html'
            }
        };

        activate();

        $scope.$watch(function () {
            return UserCtrls.selectedSidenav;
        }, function () {
            changeSelectedTabIndex();            
        });

        ////////////////

        function activate() {
            changeSelectedTabIndex();
        }

        function changeSelectedTabIndex () {
            var index = Object.keys(sidenavVM.tabs).indexOf(UserCtrls.selectedSidenav);
            if(index >= 0){
                sidenavVM.selectedTabIndex = index;
            }
        }
    }
})();

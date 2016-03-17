(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Sidenav', Sidenav);

    Sidenav.$inject = ['$mdSidenav'];

    /* @ngInject */
    function Sidenav($mdSidenav) {
        var self = this;
        self.panels = panels();
        self.tabIndex = 0;
        self.open = open;

        ////////////////

        function panels () {
            return {
            'channels': {
                icon: 'radio',
                templateUrl: 'app/components/channel/channel-list.tpl.html',
                controller: 'ChannelListController',
                controllerAs: 'channelListVM'
            },
            'posts': {
                icon: 'list_view',
                templateUrl: 'app/components/post/post-list.tpl.html'
            },
            'filter': {
                icon: 'search',
                templateUrl: 'app/components/post/filter/post-filter.tpl.html'
            },
            // 'bookmark-list': {
            //     icon: 'bookmark',
            //     templateUrl: 'app/views/bookmark-list/bookmark-list.tpl.html'
            // },
            'settings': {
                icon: 'settings',
                templateUrl: 'app/components/settings/settings.tpl.html'
            }
        };
        }
        function open(sidenavID) {
            if(sidenavID in self.panels){
                self.tabIndex = Object.keys(self.panels).indexOf(sidenavID);
            }
            $mdSidenav('sidenav-left').open();
        }
    }
})();

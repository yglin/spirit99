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
            'channel': {
                icon: 'radio',
                templateUrl: 'app/components/channel/channel-list.tpl.html'
            },
            // 'post-list': {
            //     icon: 'list_view',
            //     templateUrl: 'app/views/post-list/post-list.tpl.html'
            // },
            // 'search': {
            //     icon: 'search',
            //     templateUrl: 'app/views/search/search.tpl.html'
            // },
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

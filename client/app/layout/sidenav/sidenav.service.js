(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Sidenav', Sidenav);

    Sidenav.$inject = ['$mdSidenav', 'localStorageService'];

    /* @ngInject */
    function Sidenav($mdSidenav, localStorage) {
        var self = this;
        self.panels = panels();
        self.tabIndex = localStorage.get('last-open-sidenav-tab-index');
        self.tabIndex = self.tabIndex ? self.tabIndex : Object.keys(self.panels).indexOf('settings');
        self.selectedPanel = Object.keys(self.panels)[self.tabIndex];

        self.open = open;
        self.close = close;
        self.onTabIndexChange = onTabIndexChange;

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

        function close() {
            $mdSidenav('sidenav-left').close();
        }

        function onTabIndexChange() {
            self.selectedPanel = Object.keys(self.panels)[self.tabIndex];
            localStorage.set('last-open-sidenav-tab-index', self.tabIndex);
        }
    }
})();

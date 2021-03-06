(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ChannelListController',ChannelListController);

    ChannelListController.$inject = ['CONFIG', 'Channel', 'Dialog', 'Sidenav', 'lodash'];

    /* @ngInject */
    function ChannelListController(CONFIG, Channel, Dialog, Sidenav, lodash) {
        var channelListVM = this;
        channelListVM.focusOn = '';
        channelListVM.channels = Channel.channels;
        channelListVM.addChannel = addChannel;
        channelListVM.lodash = lodash;

        activate();

        ////////////////

        function activate() {
            channelListVM.repositoryLink = CONFIG.STATION_URL + '/channels';
        }

        function addChannel (portalUrl) {
            Channel.import(portalUrl).then(function (newChannel) {
                Dialog.confirm('切換頻道', '<p>切換至新頻道?</p><h3>' + newChannel.title + '</h3>')
                .then(function () {
                    Channel.tuneIn(newChannel.id);
                    Sidenav.close();                
                });
            });
        }
    }
})();

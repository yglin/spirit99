(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ChannelListController',ChannelListController);

    ChannelListController.$inject = ['CONFIG', 'Channel'];

    /* @ngInject */
    function ChannelListController(CONFIG, Channel) {
        var channelListVM = this;
        channelListVM.focusOn = '';
        channelListVM.channels = Channel.channels;
        channelListVM.addChannel = addChannel;

        activate();

        ////////////////

        function activate() {
            if (CONFIG.env == 'development') {
                channelListVM.repositoryLink = 'http://localhost:9000/channels';
            }
        }

        function addChannel (portalUrl) {
            Channel.import(portalUrl).then(function (newChannel) {
                Channel.tuneIn(newChannel.id);
            });
        }
    }
})();

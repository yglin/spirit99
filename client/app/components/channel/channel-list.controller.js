(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ChannelListController',ChannelListController);

    ChannelListController.$inject = ['Channel'];

    /* @ngInject */
    function ChannelListController(Channel) {
        var channelListVM = this;
        channelListVM.focusOn = '';
        channelListVM.channels = Channel.channels;
        channelListVM.addChannel = addChannel;

        activate();

        ////////////////

        function activate() {
        }

        function addChannel (portalUrl) {
            Channel.prmsAdd(portalUrl).then(function (newChannel) {
                Channel.tuneIn(newChannel.id);
            });
        }
    }
})();

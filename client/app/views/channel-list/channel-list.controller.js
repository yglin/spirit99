(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ChannelListController',ChannelListController);

    ChannelListController.$inject = ['$scope', 'ChannelManager'];

    /* @ngInject */
    function ChannelListController($scope, ChannelManager) {
        var channelListVM = this;
        channelListVM.title = 'ChannelList';
        channelListVM.channels = ChannelManager.getChannels();
        channelListVM.addNewChannel = addNewChannel;

        activate();

        ////////////////

        function activate() {
        }

        function addNewChannel () {
            ChannelManager.promiseAddNewChannel(channelListVM.newPortalUrl).then(function (newChannel) {
                console.debug('Channel added: ' + newChannel.id);
                console.log(channelListVM.channels);
            }, function (error) {
                console.warning(error);
            })
        }
    }
})();

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

        activate();

        ////////////////

        function activate() {
        }
    }
})();

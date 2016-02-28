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
        channelListVM.addNewChannel = Channel.addNew;

        activate();

        ////////////////

        function activate() {
        }
    }
})();

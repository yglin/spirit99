(function() {
    'use strict';

    angular
        .module('spirit99')
        .directive('s99ChannelItem', ChannelItem);

    ChannelItem.$inject = [];

    /* @ngInject */
    function ChannelItem() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/components/channel/channel-item.tpl.html',
            bindToController: true,
            controller: ChannelItemController,
            controllerAs: 'channelItemVM',
            link: link,
            restrict: 'EA',
            scope: {
                channel: '=',
                focusOn: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    ChannelItemController.$inject = ['Channel']

    /* @ngInject */
    function ChannelItemController(Channel) {
        var channelItemVM = this;
        channelItemVM.tuneIn = Channel.tuneIn;
        channelItemVM.toggleFocus = toggleFocus;

        function toggleFocus () {
            channelItemVM.focusOn = channelItemVM.focusOn == channelItemVM.channel.id ? '' : channelItemVM.channel.id;
        }
    }
})();
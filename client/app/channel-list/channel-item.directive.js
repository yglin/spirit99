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
            templateUrl: 'app/channel-list/channel-item.tpl.html',
            bindToController: true,
            controller: ChannelItemController,
            controllerAs: 'channelItemVM',
            link: link,
            restrict: 'EA',
            scope: {
                channel: '=channel'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    ChannelItemController.$inject = ['UserCtrls']

    /* @ngInject */
    function ChannelItemController(UserCtrls) {
        var channelItemVM = this;
        channelItemVM.showButtons = false;
        channelItemVM.tuneInChannel = UserCtrls.tuneInChannel;
    }
})();
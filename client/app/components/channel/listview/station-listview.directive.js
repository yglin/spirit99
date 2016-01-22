(function() {
    'use strict';

    angular
        .module('spirit99')
        .directive('s99ChannelListview', s99ChannelListview);

    s99ChannelListview.$inject = [];

    /* @ngInject */
    function s99ChannelListview() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/components/channel/listview/channel-listview.html',
            bindToController: true,
            controller: ChannelListviewController,
            controllerAs: 'channelListviewVM',
            link: link,
            restrict: 'EA',
            scope: {
                channel: '=channelModel'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function ChannelListviewController() {

    }
})();
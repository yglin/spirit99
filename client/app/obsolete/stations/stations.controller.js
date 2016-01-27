(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['$scope', 'ChannelManager'];

    /* @ngInject */
    function ChannelsController($scope, ChannelManager) {
        var channelsVM = this;
        channelsVM.title = 'Channels';
        channelsVM.channels = [];
        channelsVM.showToolbar = false;

        activate();

        ////////////////
        
        // Watch if at least 1 channel is checked
        $scope.$watch(function(){
            for (var id in channelsVM.channels) {
                if(channelsVM.channels[id].isChecked){
                    return true;
                }
            }
            return false;
        }, function (newValue) {
            if(newValue){
                channelsVM.showToolbar = true;
            }
            else{
                channelsVM.showToolbar = false;
            }
        });

        function activate() {
            channelsVM.channels = ChannelManager.getChannels();
        }
    }
})();
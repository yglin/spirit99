(function() {
    'use strict';

    angular
        .module('spirit99')
        .controller('ChannelEditorController',ChannelEditorController);

    ChannelEditorController.$inject = ['$scope', 'ChannelManager'];

    /* @ngInject */
    function ChannelEditorController($scope, ChannelManager) {
        var channelEditorVM = this;
        channelEditorVM.title = 'ChannelEditor';

        activate();

        ////////////////

        function activate() {
        }
    }
})();
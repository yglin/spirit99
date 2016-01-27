(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(ChannelEditorRouter);

    ChannelEditorRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function ChannelEditorRouter($routeProvider){
        $routeProvider.when('/channel-editor', {
            templateUrl: 'app/channel-editor/channel-editor.html',
            controller: 'ChannelEditorController',
            controllerAs: 'channelEditorVM'
        });        
    }

})();
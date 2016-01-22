(function() {
    'use strict';

    angular
    .module('spirit99')
    .config(ChannelsRouter);

    ChannelsRouter.$inject = ['$routeProvider'];

    /* @ngInject */
    function ChannelsRouter($routeProvider){
        $routeProvider.when('/channels', {
            templateUrl: 'app/channels/channels.html',
            controller: 'ChannelsController',
            controllerAs: 'channelsVM'
        });        
    }

})();
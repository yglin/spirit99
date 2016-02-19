(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('ChannelManager', ChannelManager);

    ChannelManager.$inject = ['$rootScope', '$q', '$http', 'DEFAULTS', 'FakeData'];

    /* @ngInject */
    function ChannelManager($rootScope, $q, $http, DEFAULTS, FakeData) {
        var self = this;
        self.channels = null;
        self.categories = {};
        self.promiseAddNewChannel = promiseAddNewChannel;
        self.promiseUpdateChannel = promiseUpdateChannel;
        self.getChannel = getChannel;
        self.getChannels = getChannels;
        self.loadChannels = loadChannels;
        self.getChannelTitle = getChannelTitle;
        self.getChannelLogo = getChannelLogo;
        self.getCategories = getCategories;
        self.validateChannel = validateChannel;
        self.getPostMeta = getPostMeta;

        activate();

        function activate () {
        }

        ////////////////
        function getChannel(channelID){
            var channels = self.getChannels();
            if(channels && channelID in channels){
                return channels[channelID];
            }
            else{
                return {}
            }
        }

        function getChannels () {
            if(!self.channels){
                self.channels = self.loadChannels();
            }
            return self.channels;
        }

        // TODO: Implement, load channels from local storage
        function loadChannels () {
            var channels = DEFAULTS.channels;
            return channels;
        }

        function getChannelTitle (channelID) {
            var channel = getChannel(channelID);
            return channel.title;
        }

        function getChannelLogo (channelID) {
            var channel = getChannel(channelID);
            return channel.logoUrl;
        }

        function getCategories (channelID) {
            if(self.categories && !(_.isEmpty(self.categories))){
                return self.categories;
            }
            var channel = getChannel(channelID);
            if(channel.categories){
                self.categories = channel.categories;
                if(!('misc' in self.categories)){
                    self.categories['misc'] = {
                    };                    
                }
                return self.categories;
            }
            else{
                return {};
            }            
        }

        function validateChannel (channel) {
            var required = ['portalUrl', 'id', 'title', 'description'];
            for (var i = 0; i < required.length; i++) {
                if(!(required[i] in channel) || !channel[required[i]]){
                    console.warn('Channel\'s property "' + required[i] + '" is not found');
                    console.warn(channel);
                    return false;
                }
            }
            return true;
        }

        function promiseUpdateChannel (channelID, options) {
            options = typeof options === 'undefined' ? {} : options;

            var channel = self.getChannel(channelID);
            if(!channel){
                console.error('Channel ' + channelID + ' not exist');
                return $q.reject();
            }
            options.portalUrl = typeof options.portalUrl === 'undefined' ? channel.portalUrl : options.portalUrl;

            if(!options.portalUrl){
                console.error('Not found portal url of ' + channelID);
                return $q.reject();
            }
            else{
                channel.isUpdating = true;
                return $http.get(options.portalUrl).then(
                function (respond) {
                    angular.extend(channel, respond.data);
                    channel.portalUrl = options.portalUrl;
                }, function (error) {
                    console.warn(error);
                })
                .finally(function () {
                    channel.isUpdating = false;
                });
            }
        };

        // TODO: Implement
        function promiseAddNewChannel (portalUrl) {
            var newChannel = {
                id: 'fakeNewChannel',
                title: '我想討老婆',
                description: '但是魯蛇沒工作',
                introUrl: 'http://www.google.com',
                logoUrl: 'http://cdn.meme.am/instances/52602551.jpg'
            }
            self.channels[newChannel.id] = newChannel;
            return $q.resolve(newChannel);
        }  

        // TODO: Implement
        function getPostMeta(channelName, postName) {
            return {};
        }

    }
})();
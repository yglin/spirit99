(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('ChannelManager', ChannelManager);

    ChannelManager.$inject = ['$q', '$http', 'DEFAULTS', 'UserPrefs', 'UserCtrls', 'FakeData'];

    /* @ngInject */
    function ChannelManager($q, $http, DEFAULTS, UserPrefs, UserCtrls, FakeData) {
        var self = this;
        self.channels = null;
        self.promiseAddNewChannel = promiseAddNewChannel;
        self.promiseUpdateChannel = promiseUpdateChannel;
        self.getChannel = getChannel;
        self.getChannels = getChannels;
        self.loadChannels = loadChannels;
        self.getCategories = getCategories;
        self.validateChannel = validateChannel;
        self.getPostMeta = getPostMeta;

        ////////////////
        function getChannel(channelID){
            if(typeof channelID === 'undefined' || !channelID){
                channelID = UserCtrls.tunedInChannelID;
            }
            var channels = self.getChannels();
            if(channelID in channels){
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

        function loadChannels () {
            var channels = UserPrefs.get('channels');
            for(var id in channels){
                if(!self.validateChannel(channels[id])){
                    delete channels[id];
                }
            }
            return channels;
        }

        function getCategories (channelID) {
            var channel = getChannel(channelID);
            if(channel.categories){
                return channel.categories;
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
                    if(channel.id === UserCtrls.tunedInChannelID){
                        // if it's currently tuned in channel, refresh views by tuning in it again
                        self.tuneInChannel(channel.id);
                    }
                    // console.debug(channel);
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
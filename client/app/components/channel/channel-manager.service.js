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
        self.promiseUpdateChannel = promiseUpdateChannel;
        self.getChannel = getChannel;
        self.getChannels = getChannels;
        self.loadChannels = loadChannels;
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
                return null
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
        function getPostMeta(channelName, postName) {
            return {};
        }

    }
})();
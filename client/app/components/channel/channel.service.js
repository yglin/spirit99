(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Channel', Channel);

    Channel.$inject = ['$q', '$log', '$http', '$rootScope', 'localStorageService', 'Dialog', 'nodeValidator', 'FakeData'];

    /* @ngInject */
    function Channel($q, $log, $http, $rootScope, localStorage, Dialog, nodeValidator, FakeData) {
        var self = this;
        self.channels = localStorage.get('channels');
        self.tunedInChannelID = localStorage.get('last-channel-id');
        self.prmsUpdate = prmsUpdate;
        self.prmsIsOnline = prmsIsOnline;
        self.validate = validate;
        self.normalize = normalize;
        self.tuneIn = tuneIn;
        self.markChannelOffline = markChannelOffline;
        // self.prmsInitChannels = prmsInitChannels;
        self.getTunedInChannel = getTunedInChannel;

        activate();

        ////////////////
        
        function activate () {
            self.channels = self.channels === null ? {} : self.channels;
            for (var id in self.channels){
                self.normalize(self.channels[id]);
            }
        }

        function getTunedInChannel() {
            if (self.tunedInChannelID in self.channels) {
                return self.channels[self.tunedInChannelID];
            }
            else {
                return null;
            }
        }

        function validate (channel) {
            var required_fields = {
                id: 'string',
                title: 'string',
                description: 'string',
                'post-url': 'url'
            };
            for (var key in required_fields) {
                if (!(key in channel)) {
                    return false;
                }
                if (required_fields[key] == 'url') {
                    if (!nodeValidator.isURL(channel[key])) {
                        return false;
                    };
                }
                else if (typeof channel[key] !== required_fields[key]) {
                    return false;
                };
            }
            return true;
        }

        function normalize (channel) {
            if (!channel['logo-url'] || typeof channel['logo-url'] != 'string') {
                channel['logo-url'] = 'https://cdn3.iconfinder.com/data/icons/communication-mass-media-news/512/microphone-32.png';
            }

            if (!channel.categories || typeof channel.categories != 'object') {
                channel.categories = {};
            }

            if (!channel.runtime || typeof channel.runtime != 'object') {
                channel.runtime = {};
            };
        }

        function prmsUpdate (channel) {
            if (!('portal-url' in channel)) {
                $log.error('Not found portal url in channel: ' + channel.id);
                return $q.reject();
            }
            return $http.get(channel['portal-url'])
            .then(function (response) {
                if (!self.validate(response.data)) {
                    channel.runtime.isUpdated = false;
                    return $q.resolve()
                }
                else{
                    angular.extend(channel, response.data);
                    self.normalize(channel);
                    channel.runtime.isUpdated = true;
                    return $q.resolve(channel);                    
                }
            }, function (error) {
                $log.warn('Update channel ' + channel.id + ' failed: ' + error.data);
                return $q.reject(error.data);
            });
        }

        function prmsIsOnline (channel) {
            if (!channel.runtime || !channel.runtime.isOffline) {
                return $q.resolve();
            }
            if (!('portal-url' in channel)) {
                return $q.reject();
            }
            return $http.get(channel['portal-url'])
            .then(function (response) {
                channel.runtime.isOffline = false;
                return $q.resolve();
            }, function (error) {
                channel.runtime.isOffline = true;
                return $q.reject();
            });

        }

        function tuneIn (channelID) {
            if (!(channelID in self.channels)) {
                Dialog.alert('找不到頻道', '找不到頻道, ID = ' + channelID);
                return;
            }
            
            var channel = self.channels[channelID];
            var prmsUpdated;
            if(!channel.runtime.isUpdated){
                prmsUpdated = self.prmsUpdate(channel);
            }
            else{
                prmsUpdated = $q.resolve();
            }
            
            prmsUpdated.then(function () {
                self.prmsIsOnline(channel)
                .then(function () {
                    self.tunedInChannelID = channelID;
                    $rootScope.$broadcast('channel:tuned', channelID);                    
                }, function (error) {
                    self.markChannelOffline(channelID);
                    Dialog.alert('頻道無法連線', '頻道目前無法連線，請稍候再嘗試看看');
                });
            }, function (error) {
                self.markChannelOffline(channelID);
                Dialog.alert('頻道無法連線', '頻道目前無法連線，請稍候再嘗試看看');
            });
        }

        function markChannelOffline (channelID) {
            self.channels[channelID].runtime.isOffline = true;
        }
        // function prmsInitChannels () {
        //     var channels = localStorage.get('channels');
        //     if(channels && !_.isEmpty(channels)){
        //         angular.extend(self.channels, channels);
        //     }
        //     for (var i = 0; i < self.channels.length; i++) {
        //         self.prmsUpdate(self.channels[i]);
        //         self.normalize(self.channels[i]);
        //     };
        //     return $q.resolve(self.channels);
        // }
        //////////////////// Functions for initialize default CONSTANTS
        
        // function ghostChannel () {
        //     return {
        //         title: '請選擇頻道',
        //         logoUrl: 'https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/45-128.png'
        //     }
        // }
    }
})();

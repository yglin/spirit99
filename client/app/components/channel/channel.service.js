(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Channel', Channel);

    Channel.$inject = ['$q', '$log', '$http', '$rootScope', 'localStorageService', 'Dialog', 'nodeValidator'];

    /* @ngInject */
    function Channel($q, $log, $http, $rootScope, localStorage, Dialog, nodeValidator) {
        var self = this;
        self.channels = localStorage.get('channels');
        self.tunedInChannelID = localStorage.get('last-channel-id');
        self.prmsAdd = prmsAdd;
        self.prmsUpdate = prmsUpdate;
        self.prmsDelete = prmsDelete;
        self.prmsIsOnline = prmsIsOnline;
        self.validate = validate;
        self.normalize = normalize;
        self.tuneIn = tuneIn;
        self.markChannelOffline = markChannelOffline;
        // self.prmsInitChannels = prmsInitChannels;
        self.getChannel = getChannel;
        self.getCategories = getCategories;
        self.getQueryUrl = getQueryUrl;

        activate();

        ////////////////
        
        function activate () {
            self.channels = self.channels === null ? {} : self.channels;
            for (var id in self.channels){
                self.normalize(self.channels[id]);
            }
            if (self.tunedInChannelID in self.channels) {
                self.tuneIn(self.tunedInChannelID);
            };
        }

        function getChannel(channelID) {
            channelID = typeof channelID === 'undefined' ? self.tunedInChannelID : channelID;
            if (channelID in self.channels) {
                return self.channels[channelID];
            }
            else {
                return null;
            }
        }

        function getCategories (channelID) {
            var channel = self.getChannel(channelID);
            if (channel && channel.categories) {
                return channel.categories;
            }
            else {
                return {};
            }
        }

        function getQueryUrl (channelID) {
            var channel = self.getChannel(channelID);
            if(!channel || !('query-url' in channel)){
                $log.error('Can not find "query-url" in channel: ' + channel);
                return null;
            }
            else{
                return channel['query-url'];
            }
        }

        function validate (channel) {
            var required_fields = {
                id: 'string',
                title: 'string',
                description: 'string',
                'query-url': 'url'
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
            }
        }

        function prmsUpdate (channel) {
            // console.debug('stop update, you fucking moron ' + channel['portal-url']);
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
            // console.debug("is online? " + channel['portal-url']);
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
            // If not given channelID, tune off
            if (typeof channelID === 'undefined' || !channelID) {
                self.tunedInChannelID = null;
                $rootScope.$broadcast('channel:tuned', self.tunedInChannelID);                
                return;
            }

            var channel = self.getChannel(channelID);
            if (!channel) {
                Dialog.alert('找不到頻道', '找不到頻道, ID = ' + channelID);
                return;
            }
            
            var prmsChannelUpdated;
            if(channel.runtime.isUpdated){
                // console.debug('channel.runtime.isUpdated should be fucking true')
                prmsChannelUpdated = $q.resolve();
            }
            else{
                prmsChannelUpdated = self.prmsUpdate(channel);
            }
            
            // console.debug('Fuck 2~!!!');
            // console.debug(prmsChannelUpdated.$$state);
            prmsChannelUpdated.then(function () {
                // console.debug('Fuck 3~!!!');
                self.prmsIsOnline(channel)
                .then(function () {
                    self.tunedInChannelID = channelID;
                    $rootScope.$broadcast('channel:tuned', self.tunedInChannelID);
                    localStorage.set('last-channel-id', self.tunedInChannelID);
                }, function (error) {
                    // console.debug('Don\'t screw me please');
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

        function prmsAdd (portalUrl) {
            return $http.get(portalUrl)
            .then(function (response) {
                var channel = response.data;
                if(self.validate(channel)){
                    self.normalize(channel);
                    self.channels[channel.id] = channel;
                    return $q.resolve(channel);
                }
                else{
                    Dialog.alert('資料錯誤', '頻道資料錯誤：<br><p>' + JSON.stringify(channel) + '</p>');
                    return $q.reject('Fail on validating channel ' + response.data);
                }
            }, function (error) {
                Dialog.alert('連線錯誤', '無法連線到以下網址：<br>' + portalUrl);
                $log.warn('Fail to add channel with poratl url: ' + portalUrl);
                return $q.reject(error.data);
            });
        }

        function prmsDelete (channelID) {
            var channel = self.getChannel(channelID);
            if (!channel) {
                return $q.reject();
            }

            return Dialog.confirm('刪除頻道', '確定要刪除以下頻道？<br><b>' + channel.title + '</b>')
            .then(function () {
                delete self.channels[channelID];
                if (channelID == self.tunedInChannelID) {
                    self.tuneIn();
                }
                $rootScope.$broadcast('channel:deleted', channelID);
                return $q.resolve();
            }, function (error) {
                return $q.reject(error);
            });
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

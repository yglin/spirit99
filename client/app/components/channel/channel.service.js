(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('Channel', Channel);

    Channel.$inject = ['CONFIG', '$q', '$log', '$http', '$routeParams', '$location', '$rootScope', 'localStorageService', 'Dialog', 'nodeValidator', 'Category', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function Channel(CONFIG, $q, $log, $http, $routeParams, $location, $rootScope, localStorage, Dialog, nodeValidator, Category, uiGmapGoogleMapApi) {
        var self = this;
        self.channels = undefined;
        self.tunedInChannelID = undefined;
        self.import = _import;
        self.prmsUpdate = prmsUpdate;
        self.prmsDelete = prmsDelete;
        self.prmsIsOnline = prmsIsOnline;
        self.validate = validate;
        self.normalize = normalize;
        self.tuneIn = tuneIn;
        self.markChannelOffline = markChannelOffline;
        // self.prmsInitChannels = prmsInitChannels;
        self.get = get;
        self.save = save;
        self.delete = _delete;
        self.getData = getData;

        activate();

        ////////////////
        
        function activate () {
            self.lastChannelId = localStorage.get('last-channel-id');
            self.channels = localStorage.get('channels');

            self.channels = self.channels === null ? {} : self.channels;
            for (var id in self.channels){
                self.normalize(self.channels[id]);
            }

            uiGmapGoogleMapApi.then(function () {
                var importPortal = $location.search().import;
                if (importPortal) {
                    self.import(importPortal)
                    .then(function (channel) {
                        self.tuneIn(channel.id);
                    });
                }
                else if ($routeParams.channel) {
                    self.tuneIn($routeParams.channel);
                }
                else if (self.lastChannelId in self.channels) {
                    self.tuneIn(self.lastChannelId);
                };                
            });
        }

        function getData() {
            var channelID, field;
            if (arguments.length == 1) {
                channelID = self.tunedInChannelID;
                field = arguments[0];
            }
            else if (arguments.length >= 2) {
                channelID = arguments[0];
                field = arguments[1];
            }
            if (channelID in self.channels && field in self.channels[channelID]) {
                return self.channels[channelID][field];
            }
            else {
                return null;
            }            
        }

        function get(channelID) {
            channelID = typeof channelID === 'undefined' ? self.tunedInChannelID : channelID;
            if (channelID in self.channels) {
                return self.channels[channelID];
            }
            else {
                return null;
            }
        }

        function save (channel) {
            var channels = localStorage.get('channels');
            if (!channels) {
                channels = {};
            }
            if (!channels[channel.id]) {
                channels[channel.id] = {};
            }
            for (var field in channel) {
                if (CONFIG['CHANNEL_SAVING_FIELDS'].indexOf(field) >= 0) {
                    channels[channel.id][field] = channel[field];
                }
            }
            localStorage.set('channels', channels);
        }

        function _delete (channel) {
            var channels = localStorage.get('channels');
            if (channels && channel.id in channels) {
                delete channels[channel.id];
                localStorage.set('channels', channels);
            }            
        }

        function validate (channel) {
            var required_fields = {
                id: 'string',
                title: 'string',
                description: 'string',
                'query-url': 'url',
            };
            for (var key in required_fields) {
                if (!(key in channel)) {
                    $log.warn('Can not find property "' + key + '" in channel portal');
                    return false;
                }
                if (required_fields[key] == 'url') {
                    if (!nodeValidator.isURL(channel[key], {allow_protocol_relative_urls: true})) {
                        $log.warn('channel.' + key + ' - ' + channel[key] + ' is not an url');
                        return false;
                    };
                }
                else if (typeof channel[key] !== required_fields[key]) {
                    $log.warn('"' + key + '" is not type of ' + required_fields[key]);
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

            var channel = self.get(channelID);
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
                    Category.rebuildCategories(channel.categories)
                    .then(function () {
                        $rootScope.$broadcast('channel:tuned', self.tunedInChannelID);
                        localStorage.set('last-channel-id', self.tunedInChannelID);                        
                    }, function (error) {
                        self.markChannelOffline(channelID);
                        Dialog.alert('頻道資料錯誤', '建立頻道失敗，請稍候再嘗試看看');                        
                    });
                }, function (error) {
                    // console.debug('Don\'t screw me please');
                    self.markChannelOffline(channelID);
                    Dialog.alert('頻道無法連線', '頻道<b>' + (self.getData(channelID, 'title') || channelID) + '</b>目前無法連線，請稍候再嘗試看看');
                });
            }, function (error) {
                self.markChannelOffline(channelID);
                Dialog.alert('頻道無法連線', '頻道<b>' + (self.getData(channelID, 'title') || channelID) + '</b>目前無法連線，請稍候再嘗試看看');
            });
        }

        function markChannelOffline (channelID) {
            self.channels[channelID].runtime.isOffline = true;
        }

        function _import (portalUrl) {
            return $http.get(portalUrl)
            .then(function (response) {
                var channel = response.data;
                if(self.validate(channel)){
                    if (!channel['portal-url']) {
                        channel['portal-url'] = portalUrl;
                    }
                    self.normalize(channel);
                    self.channels[channel.id] = channel;
                    self.save(channel);
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
            var channel = self.get(channelID);
            if (!channel) {
                return $q.reject();
            }

            return Dialog.confirm('刪除頻道', '確定要刪除以下頻道？<br><b>' + channel.title + '</b>')
            .then(function () {
                delete self.channels[channelID];
                if (channelID == self.tunedInChannelID) {
                    self.tuneIn();
                }
                self.delete(channel);
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

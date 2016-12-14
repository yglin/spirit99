'use strict';

var FakeData = require('../../../mocks/data.js');

describe('Channel', function () {
    beforeEach(angular.mock.module('spirit99'));

    // Mock Dependencies
    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Dialog', MockDialog);
        
            MockDialog.$inject = ['$q'];
        
            function MockDialog ($q) {
                var self = this;
                self.alert = jasmine.createSpy('alert')
                .and.returnValue($q.resolve());
                self.confirm = jasmine.createSpy('confirm')
                .and.returnValue($q.resolve());
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Post', MockPost);
        
            MockPost.$inject = [];
        
            function MockPost () {
                var self = this;
                // self.property = {};
                // self.method = jasmine.createSpy('method')
                // .and.callFake(function () {
                // });
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('Category', MockCategory);
        
            MockCategory.$inject = ['$q'];
        
            function MockCategory ($q) {
                var self = this;
                // self.property = {};
                self.rebuildCategories = jasmine.createSpy('rebuildCategories')
                .and.callFake(function () {
                    return $q.resolve();
                });
            }
        });
    });

    // Fake data into local storage
    var fakeChannels;
    beforeEach(inject(function (localStorageService) {
        localStorageService.set('channels', FakeData.channels);
    }));
    afterEach(inject(function (localStorageService) {
        localStorageService.clearAll();
    }));

    // Initizlize global variables
    var Channel, $q, $rootScope, Dialog, scope, $httpBackend, localStorage;
    beforeEach(inject(function (_Channel_, _$q_, _$rootScope_, _Dialog_, _$httpBackend_, localStorageService) {
        Channel = _Channel_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        Dialog = _Dialog_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        localStorage = localStorageService;
    }));

    describe(' - getData()', function() {
        var targetData;
        beforeEach(function() {
            targetData = 'I\'m the target field data to be get';
        });

        it(' - Given 1 argument as data key, get field data of currently tuned in channel', function() {
            Channel.tunedInChannelID = Object.keys(Channel.channels)[0];
            Channel.channels[Channel.tunedInChannelID].targetField = targetData;
            expect(Channel.getData('targetField')).toEqual(targetData);
        });

        it(' - Given 2 arguments as channel id and data key, get the field data of that channel', function() {
            Channel.channels.ggyygyy = {
                targetField: targetData
            };
            expect(Channel.getData('ggyygyy', 'targetField')).toEqual(targetData);
        });

        it(' - Otherwise get null', function() {
            expect(Channel.getData()).toBeNull();
            expect(Channel.getData('yyggygg')).toBeNull();
            expect(Channel.getData()).toBeNull();
            Channel.channels.ggyygyy = {
                targetField: targetData
            };
            expect(Channel.getData('ggyygyy', 'targetMyS')).toBeNull();
        });
    });

    describe(' - prmsUpdate()', function() {
        var channel, onSuccess, onFail, server, brokenServer;
        beforeEach(function() {
            channel = Channel.channels['nuclear-waste'];

            spyOn(Channel, 'validate').and.callFake(function () {
               return true; 
            });
            spyOn(Channel, 'normalize');

            onSuccess = jasmine.createSpy('onSuccess');
            onFail = jasmine.createSpy('onFail');

            server = {
                url: 'http://channels.9493.tw/nuclear-waste/portal',
            };
            server.newPortal = angular.copy(channel);
            delete server.newPortal.runtime;
            delete server.newPortal['portal-url'];
            server.newPortal.title = '核子試爆場';
            server.newPortal.description = '偶素倫偶緩核';

            brokenServer = {
                url: 'http://i.do.miss.yllek',
                errorMsg: 'Should have dated her'
            };
            $httpBackend.when('GET', brokenServer.url).respond(404, brokenServer.errorMsg);
            $httpBackend.when('GET', server.url).respond(200, server.newPortal);
        });

        it(' - Should reject if not found portal url in channel', function() {
            delete channel['portal-url'];
            Channel.prmsUpdate(channel).then(onSuccess, onFail);
            $rootScope.$digest();
            expect(onFail).toHaveBeenCalled();
        });

        it(' - Should reject with connection error', function() {
            channel['portal-url'] = brokenServer.url;
            Channel.prmsUpdate(channel).then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(onFail).toHaveBeenCalledWith(brokenServer.errorMsg);            
        });

        it(' - Should set property "runtime.isUpdated" of channel', function() {
            channel.runtime.isUpdated = false;
            channel['portal-url'] = server.url;
            Channel.prmsUpdate(channel).then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(channel.runtime.isUpdated).toBe(true);
        });

        it(' - Should call validate() upon response data', function () {
            channel['portal-url'] = server.url;
            Channel.prmsUpdate(channel).then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(Channel.validate).toHaveBeenCalledWith(server.newPortal);
        });

        it(' - Should call normalize() upon updated channel data', function() {
            channel['portal-url'] = server.url;
            Channel.prmsUpdate(channel).then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(Channel.normalize).toHaveBeenCalled();
        });

        it(' - Should updated channel\'s portal data', function() {
            channel['portal-url'] = server.url;
            Channel.prmsUpdate(channel).then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(channel.title).toEqual(server.newPortal.title);
            expect(channel.description).toEqual(server.newPortal.description);
        });

    });

    describe(' - validate()', function() {
        
        it(' - Should return true only when channel has all required fields and match their types', function() {
            var channel = {
                id: 'test',
                title: '我是魯蛇',
                description: '我魯魯魯魯魯魯',
            };
            expect(Channel.validate(channel)).toBe(false);
            channel['query-url'] = 'This.is.not.a valid/url';
            expect(Channel.validate(channel)).toBe(false);
            channel['query-url'] = 'http://www.9493.tw/nuclear-waste/query';
            expect(Channel.validate(channel)).toBe(true);
        });
    });

    describe(' - normalize()', function() {
        
        it(' - Normalized channel object should has certain properties', function() {
            var normalized_fields = {
                'logo-url': 'string',
                categories: 'object',
                runtime: 'object'
            };
            var channel = {
                id: 'test',
                title: '我是魯蛇',
                description: '我魯魯魯魯魯魯',
                'query-url': 'http://www.9493.tw/nuclear-waste/post'
            };
            Channel.normalize(channel);
            for (var key in normalized_fields) {
                expect(key in channel).toBe(true);
                expect(typeof channel[key]).toEqual(normalized_fields[key]);
            }
        });
    });

    describe(' - prmsIsOnline()', function() {
        var channel, onSuccess, onFail, brokenUrl, onlineUrl;
        beforeEach(function() {
            channel = {
                runtime: {}
            };

            onSuccess = jasmine.createSpy('onSuccess');
            onFail = jasmine.createSpy('onFail');

            brokenUrl = 'http://yllek.laugh.cutest';
            onlineUrl = 'http://would.do.anything';

            $httpBackend.when('GET', brokenUrl).respond(404, 'in this world');
            $httpBackend.when('GET', onlineUrl).respond(200, 'to see it again');
        });
        it(' - Pass the check when channel online (channel.runtime.isOffline == undefined or false)', function() {
            channel.runtime.isOffline = false;
            Channel.prmsIsOnline(channel).then(onSuccess, onFail);
            $rootScope.$digest();
            expect(onSuccess).toHaveBeenCalled();
        });

        it(' - Reject and set channel offline on fail', function() {
            channel.runtime.isOffline = true;
            channel['portal-url'] = brokenUrl;
            Channel.prmsIsOnline(channel).then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(channel.runtime.isOffline).toBe(true);
            expect(onFail).toHaveBeenCalled();            
        });

        it(' - Resolve and set channel online on success', function() {
            channel.runtime.isOffline = true;
            channel['portal-url'] = onlineUrl;
            Channel.prmsIsOnline(channel).then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(channel.runtime.isOffline).toBe(false);
            expect(onSuccess).toHaveBeenCalled();            
        });
    });

    describe(' - tuneIn()', function() {
        
        beforeEach(function() {
            // Mock prmsUpdate()
            spyOn(Channel, 'prmsUpdate').and.returnValue($q.resolve());
            spyOn(Channel, 'prmsIsOnline').and.returnValue($q.resolve());
            Channel.channels['nuclear-waste'].runtime.isUpdated = true;
        });

        it(' - Should alert user if channel not found', function() {
            Channel.tuneIn('ghost-channel');
            expect(Dialog.alert).toHaveBeenCalled();            
        });

        it(' - If channel not updated, call prmsUpdate() upon it', function() {
            delete Channel.channels['nuclear-waste'].runtime.isUpdated;
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            expect(Channel.prmsUpdate).toHaveBeenCalled();
        });

        it(' - Should alert user if not online , and mark channel as offline', function () {
            Channel.prmsIsOnline.and.returnValue($q.reject());
            spyOn(Channel, 'markChannelOffline');
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            expect(Dialog.alert).toHaveBeenCalled();
            expect(Channel.markChannelOffline).toHaveBeenCalledWith('nuclear-waste');
        });

        it(' - Should change tuned-in channelID and broadcast event "channel:tuned" on success', function() {
            var onChannelTuned = jasmine.createSpy('onChannelTuned');
            scope.$on('channel:tuned', onChannelTuned);
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            expect(Channel.tunedInChannelID).toEqual('nuclear-waste');
            expect(onChannelTuned).toHaveBeenCalled();
        });

        it(' - Should set last-channel-id in local storage', function() {
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            expect(localStorage.get('last-channel-id')).toEqual('nuclear-waste');
        });

        it(' - Tune in to no channel, should revert to no channel tuned-in state', function() {
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            Channel.tuneIn();
            $rootScope.$digest();
            expect(Channel.tunedInChannelID).toBeNull();
        });
    });

    describe(' - import()', function() {
        var newChannel, onSuccess, onFail;
        beforeEach(function() {
            newChannel = FakeData.newChannel;
            
            $httpBackend.when('GET', 'http://houston.ready.to.go')
            .respond(200, newChannel);
            $httpBackend.when('GET', 'http://highway.to.hell')
            .respond(404, 'I\'ll be there for you');

            onSuccess = jasmine.createSpy('onSuccess');
            onFail = jasmine.createSpy('onFail');

            spyOn(Channel, 'validate').and.returnValue(true);
            spyOn(Channel, 'normalize');
        });

        it(' - Should raise alert dialog on http fail', function() {
            Channel.import('http://highway.to.hell').then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(onFail).toHaveBeenCalled();
            expect(Dialog.alert).toHaveBeenCalled();
        });

        it(' - Should call validate() upon new channel', function() {
            Channel.import('http://houston.ready.to.go').then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(Channel.validate).toHaveBeenCalledWith(newChannel);
        });

        it(' - Should raise alert dialog on validate fail', function() {
            Channel.validate.and.returnValue(false);
            Channel.import('http://houston.ready.to.go').then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(Dialog.alert).toHaveBeenCalled();                        
        });

        it(' - Should call normalize() upon new channel', function() {
            Channel.import('http://houston.ready.to.go').then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(Channel.normalize).toHaveBeenCalledWith(newChannel);
        });

        it(' - Should add new channel into Channel.channels on success', function() {
            Channel.import('http://houston.ready.to.go').then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(Channel.channels[newChannel.id]).toEqual(newChannel);
        });

        it(' - Should save channel on success', function() {
            spyOn(Channel, 'save');
            Channel.import('http://houston.ready.to.go').then(onSuccess, onFail);
            $httpBackend.flush();
            $rootScope.$digest();
            expect(Channel.save).toHaveBeenCalledWith(newChannel);
        });
    });

    describe(' - prmsDelete', function() {
        var deleteChannelID;
        beforeEach(function() {
            spyOn(Channel, 'prmsUpdate').and.returnValue($q.resolve());
            spyOn(Channel, 'prmsIsOnline').and.returnValue($q.resolve());
            deleteChannelID = Object.keys(FakeData.channels)[0];
        });

        it(' - Should raise dialog to confirm deletion', function() {
            Channel.prmsDelete(deleteChannelID);
            $rootScope.$digest();
            expect(Dialog.confirm).toHaveBeenCalled();
        });

        it(' - Should delete channel in Channel.channels', function() {
            Channel.prmsDelete(deleteChannelID);
            $rootScope.$digest();
            expect(Channel.channels[deleteChannelID]).toBeUndefined();
        });

        it(' - Should call Channel.tuneIn() without given channel id, if current tuned-in channel is deleted', function() {
            Channel.tuneIn(deleteChannelID);
            $rootScope.$digest();
            spyOn(Channel, 'tuneIn');
            Channel.prmsDelete(deleteChannelID);
            $rootScope.$digest();
            expect(Channel.tuneIn).toHaveBeenCalledWith();
        });

        it(' - Should broadcast "channel:deleted" event with deleted channel id', function() {
            var onChannelDeleted = jasmine.createSpy('onChannelDeleted');
            scope.$on('channel:deleted', function (event, data) {
                onChannelDeleted(data);
            });
            Channel.prmsDelete(deleteChannelID);
            $rootScope.$digest();
            expect(onChannelDeleted).toHaveBeenCalledWith(deleteChannelID);
        });

        it(' - Should delete channel on success', function() {
            spyOn(Channel, 'delete');
            var deleteChannel = Channel.get(deleteChannelID);
            Channel.prmsDelete(deleteChannelID);
            $rootScope.$digest();
            expect(Channel.delete).toHaveBeenCalledWith(deleteChannel);
        });

    });

});

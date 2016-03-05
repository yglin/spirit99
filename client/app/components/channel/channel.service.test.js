'use strict';
        
describe('Channel', function () {
    beforeEach(module('spirit99'));

    // Mock Dependencies
    beforeEach(function() {
        module(function($provide) {
            $provide.service('Dialog', mockDialog);
        
            mockDialog.$inject = [];
        
            function mockDialog () {
                var self = this;
                self.alert = jasmine.createSpy('alert')
                .and.callFake(function () {
                    return
                });
            }
        });
    });

    // Fake data into local storage
    var fakeChannels;
    beforeEach(inject(function (FakeData, localStorageService) {
        localStorageService.set('channels', FakeData.fakeChannels);
    }));

    var Channel, $q, $rootScope, Dialog, scope, $httpBackend;
    beforeEach(inject(function (_Channel_, _$q_, _$rootScope_, _Dialog_, _$httpBackend_) {
        Channel = _Channel_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        Dialog = _Dialog_;
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
    }));

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
            }
            expect(Channel.validate(channel)).toBe(false);
            channel['query-url'] = 'This.is.not.a valid/url';
            expect(Channel.validate(channel)).toBe(false);
            channel['query-url'] = 'http://www.9493.tw/nuclear-waste/post';
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
            spyOn(Channel, 'prmsUpdate').and.callFake(function (channel) {
                channel.prmsUpdated = $q.resolve();
                return channel.prmsUpdated;
            });
            Channel.channels['nuclear-waste'].runtime.isUpdated = true;
        });

        it(' - Should alert user if channel not found', function() {
            Channel.tuneIn('ghost-channel');
            expect(Dialog.alert).toHaveBeenCalled();            
        });

        it(' - If channel not updated, call prmsUpdate() upon it', function() {
            delete Channel.channels['nuclear-waste'].runtime.isUpdated;
            spyOn(Channel, 'prmsIsOnline').and.callFake(function () {
                return $q.resolve();
            });
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            expect(Channel.prmsUpdate).toHaveBeenCalled();
        });

        it(' - Should alert user if not online , and mark channel as offline', function () {
            spyOn(Channel, 'prmsIsOnline').and.callFake(function () {
                return $q.reject();
            });
            spyOn(Channel, 'markChannelOffline');
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            expect(Dialog.alert).toHaveBeenCalled();
            expect(Channel.markChannelOffline).toHaveBeenCalledWith('nuclear-waste');
        });

        it(' - Should change tuned-in channelID and broadcast event "channel:tuned" on success', function() {
            var onChannelTuned = jasmine.createSpy('onChannelTuned');
            scope.$on('channel:tuned', onChannelTuned);
            spyOn(Channel, 'prmsIsOnline').and.callFake(function () {
                return $q.resolve();
            });
            Channel.tuneIn('nuclear-waste');
            $rootScope.$digest();
            expect(Channel.tunedInChannelID).toEqual('nuclear-waste');
            expect(onChannelTuned).toHaveBeenCalled();
        });
    });

    describe(' - getCategories()', function() {
        it(' - Given no channel id, should return categories of current tuned-in channel', function() {
            Channel.tunedInChannelID = Object.keys(Channel.channels)[0];
            var categories = Channel.channels[Channel.tunedInChannelID].categories;
            expect(Channel.getCategories()).toBe(categories);
        });

        it(' - Given channel id, should return categories of the channel', function() {
            var channelID = Object.keys(Channel.channels)[0];
            var categories = Channel.channels[channelID].categories;
            expect(Channel.getCategories(channelID)).toBe(categories);
        });
    });

});
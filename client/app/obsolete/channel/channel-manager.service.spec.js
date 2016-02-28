// 'use strict';
        
// describe('ChannelManager', function () {
//     beforeEach(module('spirit99'));

//     // Mock dependencies
//     beforeEach(function() {

//         module(function($provide) {
//             $provide.service('UserPrefs', mockUserPrefs);
        
//             mockUserPrefs.$inject = ['DEFAULTS'];
        
//             function mockUserPrefs (DEFAULTS) {
//                 var self = this;
//                 // self.property = {};
//                 self.get = jasmine.createSpy('get')
//                 .and.callFake(function (key) {
//                     if(key in DEFAULTS){
//                         return DEFAULTS[key];
//                     }
//                     else{
//                         return null;
//                     }
//                 });
//             }
//         });

//         module(function($provide) {
//             $provide.service('UserCtrls', mockUserCtrls);
        
//             mockUserCtrls.$inject = [];
        
//             function mockUserCtrls () {
//                 var self = this;
//                 self.tunedInChannelID = 'nuclear-waste';
//                 self.tuneInChannel = jasmine.createSpy('tuneInChannel')
//                 .and.callFake(function (channelID) {
//                     self.tunedInChannelID = channelID;
//                 });
//             }
//         });
//     });


//     var ChannelManager, $httpBackend, DEFAULTS, UserCtrls, UserPrefs;
//     beforeEach(inject(function (_ChannelManager_, _$httpBackend_, _DEFAULTS_, _UserCtrls_, _UserPrefs_) {
//         $httpBackend = _$httpBackend_;
//         ChannelManager = _ChannelManager_;
//         UserCtrls = _UserCtrls_;
//         UserPrefs = _UserPrefs_;
//         DEFAULTS = _DEFAULTS_;
//     }));

//     afterEach(function() {
//         $httpBackend.verifyNoOutstandingExpectation();
//         $httpBackend.verifyNoOutstandingRequest();
//     });

//     describe(' - getChannel(channelID)', function() {

//         it(' - Should return a channel object if channel exist', function() {
//             var nuclear_waste = ChannelManager.getChannel('nuclear-waste');
//             expect(nuclear_waste).not.toBeNull();
//             expect(nuclear_waste.id).toBe('nuclear-waste');
//         });

//         it(' - Should return current selected channel if not given channelID', function() {
//             var tunedInChannel = ChannelManager.getChannel();
//             expect(tunedInChannel).not.toBeNull();
//             expect(tunedInChannel.id).toBe('nuclear-waste');
//         });

//         it(' - Should return null if channel not exist', function() {
//             var nullChannel = ChannelManager.getChannel('myS');
//             expect(nullChannel).toBeNull();
//         });
//     });

//     describe(' - getChannels()', function() {        
//         it(' - Should call loadChannels() if self.channels is null, and cache them in self.channels afterward', function() {
//             ChannelManager.channels = null;
//             spyOn(ChannelManager, 'loadChannels').and.callFake(function () {
//                 return {};
//             });
//             ChannelManager.getChannels();
//             expect(ChannelManager.loadChannels).toHaveBeenCalled();
//             expect(ChannelManager.channels).not.toBeNull();
//         });

//         it(' - Should return cached self.channels if it\'s not null or empty', function () {
//             ChannelManager.channels = DEFAULTS.channels;
//             var channels = ChannelManager.getChannels();
//             expect(channels).toEqual(ChannelManager.channels);
//         })
//     });

//     describe(' - loadChannels()', function() {
//         it(' - Should call UserPrefs.get with "channels"', function() {
//             ChannelManager.loadChannels();
//             expect(UserPrefs.get).toHaveBeenCalledWith('channels');
//         });

//         it(' - Should remove invalid channels', function() {
//             UserPrefs.get.and.callFake(function (key) {
//                 return {
//                     'channel1': {
//                         valid: true
//                     },
//                     'channel2': {
//                         valid: false
//                     },
//                     'channel3': {
//                         valid: true
//                     }
//                 }
//             });
//             spyOn(ChannelManager, 'validateChannel').and.callFake(function (channel) {
//                 return channel.valid;
//             });
//             var channels = ChannelManager.loadChannels();
//             expect(ChannelManager.validateChannel).toHaveBeenCalled();
//             for(var id in channels){
//                 expect(channels[id].valid).toBe(true);
//             }
//         });
//     });

//     describe(' - validateChannel()', function() {
//         it(' - Should test if channel has required properties and none of them is null or empty', function () {
//             var testChannel = {
//                 title: 'gggyygygy',
//                 description: 'This is YGYGYGY'
//             }
//             expect(ChannelManager.validateChannel(testChannel)).toBe(false);
//             testChannel.id = 'YGG';
//             testChannel.portalUrl = '';
//             expect(ChannelManager.validateChannel(testChannel)).toBe(false);
//             testChannel.portalUrl = 'http://www.9493.tw/YGG/portal';
//             expect(ChannelManager.validateChannel(testChannel)).toBe(true);
//         });
//     });

//     describe(' - tuneInChannel', function() {
        
//         it(' - Should have called UserCtrls.tuneInChannel()', function() {
//             var channelID = 'nuclear-waste';
//             ChannelManager.tuneInChannel(channelID);
//             expect(UserCtrls.tuneInChannel).toHaveBeenCalledWith(channelID);
//         });
//     });

//     describe(' - promiseUpdateChannel(channelID)', function() {

//         var testChannel, newChannelData;
//         beforeEach(function() {
//             ChannelManager.channels = {
//                 'test-channel': {
//                     portalUrl: 'http://www.9493.tw/test/portal/',
//                     id: 'test-channel',
//                     title: '測試電台',
//                     description: '測你個大西瓜',
//                     introUrl: 'http://www.9493.tw/test',
//                     logoUrl: 'http://www.9493.tw/test/logo.jpg'
//                 }
//             };
//             testChannel = ChannelManager.getChannel('test-channel');

//             newChannelData =  {
//                 id: 'test-channel',
//                 title: '核魯蛇掩埋場',
//                 description: '創造非魯家園',
//                 introUrl: 'http://www.9493.tw/loser',
//                 logoUrl: 'http://www.9493.tw/loser/logo.jpg'
//             };       
//             $httpBackend.expectGET(/\/portal(\/?)$/).respond(newChannelData);
//         });

//         afterEach(function() {
//             ChannelManager.channels = null;
//         });

//         it(' - Should trigger channel.isUpdating to indicate that channel is being updated', function() {
//             ChannelManager.promiseUpdateChannel('test-channel');
//             expect(testChannel.isUpdating).toBe(true);
//             $httpBackend.flush();
//             expect(testChannel.isUpdating).toBe(false);            
//         });
        
//         it(' - Should update channel\'s data', function() {
//             ChannelManager.promiseUpdateChannel('test-channel');
//             $httpBackend.flush();
//             expect(testChannel.id).toEqual(newChannelData.id);
//             expect(testChannel.title).toEqual(newChannelData.title);
//             expect(testChannel.description).toEqual(newChannelData.description);
//         });

//         it(' - Should update portalUrl if given in options after updating', function() {
//             var newPortalUrl = 'http://www.ggyy.com/test-channel/portal';
//             ChannelManager.promiseUpdateChannel('test-channel', {portalUrl: newPortalUrl});
//             $httpBackend.flush();
//             expect(testChannel.portalUrl).toEqual(newPortalUrl);
//         });

//         it(' - Should issue a channel refresh if updated channel is currently selected', function () {
//             spyOn(ChannelManager, 'tuneInChannel');
//             UserCtrls.tunedInChannelID = 'test-channel';
//             ChannelManager.promiseUpdateChannel('test-channel');
//             $httpBackend.flush();
//             expect(ChannelManager.tuneInChannel).toHaveBeenCalledWith('test-channel');
//         });
//     });
// });
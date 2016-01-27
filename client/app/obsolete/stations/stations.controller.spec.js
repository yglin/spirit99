'use strict';
        
describe('ChannelsContrller', function () {

    beforeEach(module('spirit99'));

    // Mock dependencies
    beforeEach(function() {
        module(function($provide) {
            $provide.service('ChannelsManager', mockChannelsManager);
        
            mockChannelsManager.$inject = ['DEFAULTS'];
        
            function mockChannelsManager (DEFAULTS) {
                var self = this;
                // self.property = {};
                self.getChannels = jasmine.createSpy('getChannels')
                .and.callFake(function () {
                    return DEFAULTS.channels;
                });
            }
        });        
    });

    var channelsVM, $rootScope, DEFAULTS;
    beforeEach(inject(function ($controller, _$rootScope_, _DEFAULTS_) {
        $rootScope = _$rootScope_;
        DEFAULTS = _DEFAULTS_;
        channelsVM = $controller('ChannelsController', {
            $scope: $rootScope.$new()
        });
    }));

    describe(' - Initially', function () {
        it(' - Actions panel should hide', function() {
            expect(channelsVM.showToolbar).toBe(false);
        });
    });

    describe(' - Check/Uncheck channels', function () {
        it(' - Show toolbar if at least 1 channel checked', function () {
            channelsVM.channels[Object.keys(channelsVM.channels)[0]].isChecked = true;
            $rootScope.$digest();
            expect(channelsVM.showToolbar).toBe(true);
        });

        it(' - Hide toolbar if no channel is checked', function() {
            for (var id in channelsVM.channels) {
                channelsVM.channels[id].isChecked = false;
            };
            $rootScope.$digest();
            expect(channelsVM.showToolbar).toBe(false);            
        });
    });
});

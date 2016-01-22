'use strict';
        
describe('ToolbarController', function () {

    beforeEach(module('spirit99'));

    beforeEach(function () {
        module(function($provide) {
            $provide.service('ChannelManager', mockChannelManager);
        
            mockChannelManager.$inject = ['DEFAULTS'];
        
            function mockChannelManager (DEFAULTS) {
                var self = this;
                // self.property = {};
                // console.debug(DEFAULTS.channels);
                self.getChannel = jasmine.createSpy('getChannel')
                .and.callFake(function () {
                    return DEFAULTS.channels[Object.keys(DEFAULTS.channels)[0]];
                });
            }
        });        
    });

    var toolbarVM, $rootScope, DEFAULTS;
    beforeEach(inject(function ($controller, _$rootScope_, _DEFAULTS_) {
        $rootScope = _$rootScope_;
        DEFAULTS = _DEFAULTS_;
        toolbarVM = $controller('ToolbarController', {
            $scope: $rootScope.$new()
        });
    }));

    describe(' - Initial activate()', function () {
        it(' - channel should has title and logoUrl', function () {
            // console.debug(toolbarVM.channel);
            expect(toolbarVM.channel.title).not.toBeNull();
            expect(toolbarVM.channel.logoUrl).not.toBeNull();
        });
    });
});

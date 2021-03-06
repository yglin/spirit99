'use strict';
        
describe('ToolbarController', function () {

    beforeEach(angular.mock.module('spirit99'));

    beforeEach(function () {
        angular.mock.module(function($provide) {
            $provide.service('ChannelManager', MockChannelManager);
        
            MockChannelManager.$inject = ['DEFAULTS'];
        
            function MockChannelManager (DEFAULTS) {
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

'use strict';
        
describe('Geolocation', function () {
    
    beforeEach(angular.mock.module('spirit99'));
    
    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Dialog', mockDialog);
        
            mockDialog.$inject = [];
        
            function mockDialog () {
                var self = this;
                // self.property = {};
                self.alert = jasmine.createSpy('alert')
                .and.callFake(function () {
                });
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('$window', mockWindow);
        
            mockWindow.$inject = [];
        
            function mockWindow () {
                var self = this;
                self.navigator = {
                    geolocation: {}
                };
                // self.method = jasmine.createSpy('method')
                // .and.callFake(function () {
                // });
            }
        });
    });
    
    var Geolocation, $window, $rootScope, Dialog;
    beforeEach(inject(function (_Geolocation_, _$window_, _$rootScope_, _Dialog_) {
        Geolocation = _Geolocation_;
        $window = _$window_;
        $rootScope = _$rootScope_;
        Dialog = _Dialog_;
    }));

    describe(' - prmsGetCurrentPosition()', function() {

        var fakePosition;
        beforeEach(function() {
            if (!$window.navigator) {
                $window.navigator = {};
            }
            if (!$window.navigator.geolocation) {
                $window.navigator.geolocation = {};
            }
            fakePosition ={
                coords: {
                    latitude: 54088,
                    longitude: 54065
                }
            };
        });

        it(' - Should raise alert dialog if browser not support geolocation', function() {
            $window.navigator = null;
            Geolocation.prmsGetCurrentPosition();
            $rootScope.$digest();
            expect(Dialog.alert).toHaveBeenCalled();
        });

        it(' - Should raise alert dialog if failed on getting position', function() {
            $window.navigator.geolocation.getCurrentPosition = function (success, error) {
                error("You shall not pass!!!");
            };
            Geolocation.prmsGetCurrentPosition();
            $rootScope.$digest();
            expect(Dialog.alert).toHaveBeenCalled();            
        });

        it(' - Should get position of latitude and longitude on success', function() {
            $window.navigator.geolocation.getCurrentPosition = function (success, error) {
                success(fakePosition);
            };
            var onSuccess = jasmine.createSpy('onSuccess');
            Geolocation.prmsGetCurrentPosition().then(onSuccess);
            $rootScope.$digest();
            expect(onSuccess).toHaveBeenCalledWith(fakePosition);
        });
    });
});

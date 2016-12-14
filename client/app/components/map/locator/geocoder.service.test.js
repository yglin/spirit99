'use strict';

var fakeData = require('../../../../mocks/data.js');
        
describe('Geocoder', function () {
    beforeEach(angular.mock.module('spirit99'));

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('Dialog', MockDialog);
        
            MockDialog.$inject = ['$q'];
        
            function MockDialog ($q) {
                var self = this;
                // self.property = {};
                self.alert = jasmine.createSpy('alert')
                .and.returnValue($q.resolve());
            }
        });
    });
    var Geocoder, Dialog, $rootScope;
    beforeEach(inject(function (_Geocoder_, _Dialog_, _$rootScope_) {
        Geocoder = _Geocoder_;
        Dialog = _Dialog_;
        $rootScope = _$rootScope_;
    }));

    describe(' - prmsGeocode()', function () {

        beforeEach(function() {
            Geocoder.googlemapsApi = {
                GeocoderStatus: {
                    OK: 0,
                    Fail: 1
                }
            };
            Geocoder.geocoder = {
                geocode: geocode
            };

            function geocode (query, callback) {
                callback([fakeData.geocodeChangHua], Geocoder.googlemapsApi.GeocoderStatus.OK);
            }
        });

        it(' - Should raise alert dialog if Google map api is not available', function() {
            Geocoder.googlemapsApi = null;
            Geocoder.prmsGeocode('blah blah');
            $rootScope.$digest();
            expect(Dialog.alert).toHaveBeenCalled();
        });

        it(' - Should raise alert dialog if found no result', function() {
            Geocoder.geocoder.geocode = function (query, callback) {
                callback([], Geocoder.googlemapsApi.GeocoderStatus.Fail);
            };
            Geocoder.prmsGeocode('U R SO GY');
            $rootScope.$digest();
            expect(Dialog.alert).toHaveBeenCalled();
        });
            
        it(' - Should return array of geocoded results on success', function() {
            var onSuccess = jasmine.createSpy('onSuccess');
            Geocoder.prmsGeocode('Need a job...').then(onSuccess);
            $rootScope.$digest();
            expect(onSuccess).toHaveBeenCalledWith([{
                latitude: fakeData.geocodeChangHua.geometry.location.lat(),
                longitude: fakeData.geocodeChangHua.geometry.location.lng(),
                address: fakeData.geocodeChangHua.formatted_address,
                viewport: {
                    southwest: {
                        latitude: fakeData.geocodeChangHua.geometry.viewport.south,
                        longitude: fakeData.geocodeChangHua.geometry.viewport.west
                    },
                    northeast: {
                        latitude: fakeData.geocodeChangHua.geometry.viewport.north,
                        longitude: fakeData.geocodeChangHua.geometry.viewport.east
                    }
                }
            }]);
        });
    });
});

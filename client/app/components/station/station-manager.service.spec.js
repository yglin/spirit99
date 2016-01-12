'use strict';
        
describe('StationManager', function () {
    beforeEach(module('spirit99'));

    // Mock dependencies
    beforeEach(function() {

        module(function($provide) {
            $provide.service('UserPrefs', mockUserPrefs);
        
            mockUserPrefs.$inject = ['DEFAULTS'];
        
            function mockUserPrefs (DEFAULTS) {
                var self = this;
                // self.property = {};
                self.get = jasmine.createSpy('get')
                .and.callFake(function (key) {
                    if(key in DEFAULTS){
                        return DEFAULTS[key];
                    }
                    else{
                        return null;
                    }
                });
            }
        });

        module(function($provide) {
            $provide.service('UserCtrls', mockUserCtrls);
        
            mockUserCtrls.$inject = [];
        
            function mockUserCtrls () {
                var self = this;
                self.tunedInStationID = 'nuclear-waste';
                self.tuneInStation = jasmine.createSpy('tuneInStation')
                .and.callFake(function (stationID) {
                    self.tunedInStationID = stationID;
                });
            }
        });
    });


    var StationManager, $httpBackend, DEFAULTS, UserCtrls, UserPrefs;
    beforeEach(inject(function (_StationManager_, _$httpBackend_, _DEFAULTS_, _UserCtrls_, _UserPrefs_) {
        $httpBackend = _$httpBackend_;
        StationManager = _StationManager_;
        UserCtrls = _UserCtrls_;
        UserPrefs = _UserPrefs_;
        DEFAULTS = _DEFAULTS_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe(' - getStation(stationID)', function() {

        it(' - Should return a station object if station exist', function() {
            var nuclear_waste = StationManager.getStation('nuclear-waste');
            expect(nuclear_waste).not.toBeNull();
            expect(nuclear_waste.id).toBe('nuclear-waste');
        });

        it(' - Should return current selected station if not given stationID', function() {
            var tunedInStation = StationManager.getStation();
            expect(tunedInStation).not.toBeNull();
            expect(tunedInStation.id).toBe('nuclear-waste');
        });

        it(' - Should return null if station not exist', function() {
            var nullStation = StationManager.getStation('myS');
            expect(nullStation).toBeNull();
        });
    });

    describe(' - getStations()', function() {        
        it(' - Should call loadStations() if self.stations is null, and cache them in self.stations afterward', function() {
            StationManager.stations = null;
            spyOn(StationManager, 'loadStations').and.callFake(function () {
                return {};
            });
            StationManager.getStations();
            expect(StationManager.loadStations).toHaveBeenCalled();
            expect(StationManager.stations).not.toBeNull();
        });

        it(' - Should return cached self.stations if it\'s not null or empty', function () {
            StationManager.stations = DEFAULTS.stations;
            var stations = StationManager.getStations();
            expect(stations).toEqual(StationManager.stations);
        })
    });

    describe(' - loadStations()', function() {
        it(' - Should call UserPrefs.get with "stations"', function() {
            StationManager.loadStations();
            expect(UserPrefs.get).toHaveBeenCalledWith('stations');
        });

        it(' - Should remove invalid stations', function() {
            UserPrefs.get.and.callFake(function (key) {
                return {
                    'station1': {
                        valid: true
                    },
                    'station2': {
                        valid: false
                    },
                    'station3': {
                        valid: true
                    }
                }
            });
            spyOn(StationManager, 'validateStation').and.callFake(function (station) {
                return station.valid;
            });
            var stations = StationManager.loadStations();
            expect(StationManager.validateStation).toHaveBeenCalled();
            for(var id in stations){
                expect(stations[id].valid).toBe(true);
            }
        });
    });

    describe(' - validateStation()', function() {
        it(' - Should test if station has required properties and none of them is null or empty', function () {
            var testStation = {
                title: 'gggyygygy',
                description: 'This is YGYGYGY'
            }
            expect(StationManager.validateStation(testStation)).toBe(false);
            testStation.id = 'YGG';
            testStation.portalUrl = '';
            expect(StationManager.validateStation(testStation)).toBe(false);
            testStation.portalUrl = 'http://www.9493.tw/YGG/portal';
            expect(StationManager.validateStation(testStation)).toBe(true);
        });
    });

    describe(' - tuneInStation', function() {
        
        it(' - Should have called UserCtrls.tuneInStation()', function() {
            var stationID = 'nuclear-waste';
            StationManager.tuneInStation(stationID);
            expect(UserCtrls.tuneInStation).toHaveBeenCalledWith(stationID);
        });
    });

    describe(' - promiseUpdateStation(stationID)', function() {

        var testStation, newStationData;
        beforeEach(function() {
            StationManager.stations = {
                'test-station': {
                    portalUrl: 'http://www.9493.tw/test/portal/',
                    id: 'test-station',
                    title: '測試電台',
                    description: '測你個大西瓜',
                    introUrl: 'http://www.9493.tw/test',
                    logoUrl: 'http://www.9493.tw/test/logo.jpg'
                }
            };
            testStation = StationManager.getStation('test-station');

            newStationData =  {
                id: 'test-station',
                title: '核魯蛇掩埋場',
                description: '創造非魯家園',
                introUrl: 'http://www.9493.tw/loser',
                logoUrl: 'http://www.9493.tw/loser/logo.jpg'
            };       
            $httpBackend.expectGET(/\/portal(\/?)$/).respond(newStationData);
        });

        afterEach(function() {
            StationManager.stations = null;
        });

        it(' - Should trigger station.isUpdating to indicate that station is being updated', function() {
            StationManager.promiseUpdateStation('test-station');
            expect(testStation.isUpdating).toBe(true);
            $httpBackend.flush();
            expect(testStation.isUpdating).toBe(false);            
        });
        
        it(' - Should update station\'s data', function() {
            StationManager.promiseUpdateStation('test-station');
            $httpBackend.flush();
            expect(testStation.id).toEqual(newStationData.id);
            expect(testStation.title).toEqual(newStationData.title);
            expect(testStation.description).toEqual(newStationData.description);
        });

        it(' - Should update portalUrl if given in options after updating', function() {
            var newPortalUrl = 'http://www.ggyy.com/test-station/portal';
            StationManager.promiseUpdateStation('test-station', {portalUrl: newPortalUrl});
            $httpBackend.flush();
            expect(testStation.portalUrl).toEqual(newPortalUrl);
        });

        it(' - Should issue a station refresh if updated station is currently selected', function () {
            spyOn(StationManager, 'tuneInStation');
            UserCtrls.tunedInStationID = 'test-station';
            StationManager.promiseUpdateStation('test-station');
            $httpBackend.flush();
            expect(StationManager.tuneInStation).toHaveBeenCalledWith('test-station');
        });
    });
});
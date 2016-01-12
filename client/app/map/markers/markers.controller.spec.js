'use strict';
        
describe('MarkersController', function () {

    beforeEach(module('spirit99'));

    // <<<<<<<<<<<<<<<<<<<<<<<<< Mock Dependencies <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    beforeEach(function () {
        module(function($provide) {
            $provide.service('StationManager', mockStationManager);
        
            mockStationManager.$inject = [];
        
            function mockStationManager () {
                var self = this;
                // self.property = {};
                self.getSpiritMeta = jasmine.createSpy('getSpiritMeta')
                .and.callFake(function () {
                    return {
                        url: 'http://fake.url.to/spirit/'
                    };
                });
            }
        });

        module(function($provide) {
            $provide.service('SpiritManager', mockSpiritManager);
        
            mockSpiritManager.$inject = ['$q'];
        
            function mockSpiritManager ($q) {
                var self = this;
                // self.property = {};
                self.promiseLoadSpirits = jasmine.createSpy('promiseLoadSpirits')
                .and.callFake(function () {
                    return $q.resolve(fakeSpirits);
                });
            }
        });

        module(function($provide) {
            $provide.service('IconManager', mockIconManager);
        
            mockIconManager.$inject = [];
        
            function mockIconManager () {
                var self = this;
                // self.property = {};
                self.getIconObjects = jasmine.createSpy('getIconObjects')
                .and.callFake(function () {
                    return fakeIconObjects;
                });
            }
        });

        module(function($provide) {
            $provide.service('UserCtrls', mockUserCtrls);
        
            mockUserCtrls.$inject = [];
        
            function mockUserCtrls () {
                var self = this;
                self.tunedInStation = '';
                self.selectedSpirit = '';
            }
        });
    })

    // >>>>>>>>>>>>>>>>>>>>>>>>> Mock Dependencies >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    var markersVM, $scope, $rootScope, CONFIG, FakeData, fakeSpirits, fakeIconObjects;

    beforeEach(inject(function (_$rootScope_, _FakeData_, _CONFIG_, $controller) {
        $rootScope = _$rootScope_;
        CONFIG = _CONFIG_;
        // Generate Fake Data
        FakeData = _FakeData_;
        fakeSpirits = FakeData.genFakeSpirits();
        fakeIconObjects = FakeData.genFakeIconObjects();

        $scope = $rootScope.$new();
        markersVM = $controller('MarkersController', {
            $scope: $scope
        });
    }));

    describe(' - Initial activate()', function () {
        it(' - markersVM.options.optimized should be false in development environment', function () {
            CONFIG.env = 'development';
            markersVM.activate();
            expect(markersVM.options.optimized).toBe(false);
        });

        it(' - markersVM.options.optimized should be undefined if not in development environment', function () {
            CONFIG.env = 'production';
            markersVM.activate();
            expect(markersVM.options.optimized).toBe(true);
        });

        it(' - should call refresh() when catch event "map:tilesloaded", and call only once', function () {
            spyOn(markersVM, 'refresh');
            // markersVM.activate();
            var mapData = FakeData.genFakeMap();

            // Catch event "map:tilesloaded" and call refresh()
            $rootScope.$broadcast('map:tilesloaded', mapData);
            expect(markersVM.refresh).toHaveBeenCalledWith(mapData);

            // Call refresh() only once
            $rootScope.$broadcast('map:tilesloaded', mapData);
            expect(markersVM.refresh.calls.count()).toEqual(1);
        });
    });

    describe(' - refresh()', function () {
        beforeEach(function () {
            spyOn(markersVM, 'rebuildMarkers').and.callThrough();
            var mapData = FakeData.genFakeMap();
            markersVM.refresh(mapData);
            $rootScope.$digest();
        });
        
        it('self.rebuildMarkers should have been called', function () {
            expect(markersVM.rebuildMarkers).toHaveBeenCalled();
        });

        it('self.markers should contain markerized spirits', function () {
            expect(markersVM.markers.length).toBe(fakeSpirits.length);
            expect(_.sample(markersVM.markers).markerized).toBe(true);
        });
    });

    describe(' - rebuildMarkers()', function () {

        it(' - markers should has marker-related properties', function () {
            var spirits = FakeData.genFakeSpirits({count: 100, countHasCategory: 50});
            var markers = [];
            var iconObjects = FakeData.genFakeIconObjects();
            markersVM.rebuildMarkers(spirits, fakeIconObjects, {markers: markers});
            expect(_.sample(markers).id).toBeDefined();
            expect(_.sample(markers).latitude).toBeDefined();
            expect(_.sample(markers).longitude).toBeDefined();
            expect(_.sample(markers.slice(0, 50)).iconObject).toBeDefined();
            expect(_.sample(markers.slice(50, 100)).iconObject).toBeUndefined();
            expect(_.sample(markers).markerized).toBe(true);
        });
    });

    describe(' - Events handling', function () {

        describe(' - dragend: User done dragging map', function () {

            it(' - Should call refresh with passed map model', function () {
                spyOn(markersVM, 'refresh');
                var mapModel = FakeData.genFakeMap();
                $rootScope.$broadcast('map:dragend', mapModel);
                expect(markersVM.refresh).toHaveBeenCalledWith(mapModel);
            });
        });
    });
});
'use strict';
        
describe('MarkersController', function () {

    beforeEach(angular.mock.module('spirit99'));

    // <<<<<<<<<<<<<<<<<<<<<<<<< Mock Dependencies <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    beforeEach(function () {
        angular.mock.module(function($provide) {
            $provide.service('ChannelManager', mockChannelManager);
        
            mockChannelManager.$inject = [];
        
            function mockChannelManager () {
                var self = this;
                // self.property = {};
                self.getPostMeta = jasmine.createSpy('getPostMeta')
                .and.callFake(function () {
                    return {
                        url: 'http://fake.url.to/post/'
                    };
                });
            }
        });

        angular.mock.module(function($provide) {
            $provide.service('PostManager', mockPostManager);
        
            mockPostManager.$inject = ['$q'];
        
            function mockPostManager ($q) {
                var self = this;
                // self.property = {};
                self.promiseLoadPosts = jasmine.createSpy('promiseLoadPosts')
                .and.callFake(function () {
                    return $q.resolve(fakePosts);
                });
            }
        });

        angular.mock.module(function($provide) {
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

        angular.mock.module(function($provide) {
            $provide.service('UserCtrls', mockUserCtrls);
        
            mockUserCtrls.$inject = [];
        
            function mockUserCtrls () {
                var self = this;
                self.tunedInChannel = '';
                self.selectedPost = '';
            }
        });
    })

    // >>>>>>>>>>>>>>>>>>>>>>>>> Mock Dependencies >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    var markersVM, $scope, $rootScope, CONFIG, FakeData, fakePosts, fakeIconObjects;

    beforeEach(inject(function (_$rootScope_, _FakeData_, _CONFIG_, $controller) {
        $rootScope = _$rootScope_;
        CONFIG = _CONFIG_;
        // Generate Fake Data
        FakeData = _FakeData_;
        fakePosts = FakeData.genFakePosts();
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

        it('self.markers should contain markerized posts', function () {
            expect(markersVM.markers.length).toBe(fakePosts.length);
            expect(_.sample(markersVM.markers).markerized).toBe(true);
        });
    });

    describe(' - rebuildMarkers()', function () {

        it(' - markers should has marker-related properties', function () {
            var posts = FakeData.genFakePosts({count: 100, countHasCategory: 50});
            var markers = [];
            var iconObjects = FakeData.genFakeIconObjects();
            markersVM.rebuildMarkers(posts, fakeIconObjects, {markers: markers});
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
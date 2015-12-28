'use strict';

describe('ResourceManager', function () {
    beforeEach(module('spirit99'));
    var ResourceManager;
    beforeEach(inject(function (_ResourceManager_) {
        ResourceManager = _ResourceManager_;
    }));

    describe(' - promiseLoadResources()', function () {
        var $resource, $httpBackend;
        beforeEach(inject(function (_$resource_, _$httpBackend_) {
            $resource = _$resource_;
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it(' - Should return resources if success', function () {
            var fakeResources = genFakeResources(5);
            $httpBackend.expectGET(/\/fake\.url\.to\/resource/)
            .respond(200, fakeResources);

            var resources;
            var resourcesReceiver = jasmine.createSpy('resourcesReceiver')
            .and.callFake(function (responds) {
                resources = responds;
            });
            var options = {
                Resource: $resource('http://fake.url.to/resource'),
                resourcesCache: {},
                mapBounds: {}
            };
            controller.promiseLoadResources(options).then(resourcesReceiver);
            $httpBackend.flush();
            expect(resourcesReceiver).toHaveBeenCalled();
            expect(resources.length).toEqual(fakeResources.length);
            expect(angular.toJson(resources)).toEqual(angular.toJson(fakeResources));
        });
        
        it(' - Should call ErrorHandler if failed', function () {
            
        });
    });


});

'use strict';
        
describe('FakeData', function () {
    beforeEach(module('spirit99'));
    var FakeData;
    beforeEach(inject(function (_FakeData_) {
        FakeData = _FakeData_;
    }));

    describe(' - genFakeMap()', function () {
        it(' - Should has DEFAULT\'s center and zoom', function () {
            var map = FakeData.genFakeMap();
            expect(map).toEqual(DEFAULT.map);
        });
    })

    describe(' - genFakeResources()', function () {
        it(' - Should return 10 fake resources as default count', function () {
            var fakeResources = FakeData.genFakeResources();
            expect(fakeResources.length).toBe(10);
        });

        it(' - Should return 50 fake resources if given options.count=50', function () {
            var fakeResources = FakeData.genFakeResources({count: 50});
            expect(fakeResources.length).toBe(50);
        });

        it(' - Should have property "id"', function () {
            var fakeResources = FakeData.genFakeResources();
            expect(_.sample(fakeResources).id).toBeDefined();
        });

        it(' - Should have property "latitude" and "longitude"', function () {
            var fakeResources = FakeData.genFakeResources(); 
            expect(_.sample(fakeResources).latitude).toBeDefined();           
            expect(_.sample(fakeResources).longitude).toBeDefined();           
        });

        it(' - Should have property "category"', function () {
            var fakeResources = FakeData.genFakeResources();
            expect(_.sample(fakeResources).category).toBeDefined();
        });

        it(' - None of resources should have property "category" if given options.countHasCategory=0', function () {
            var fakeResources = FakeData.genFakeResources({countHasCategory: 0});
            expect(_.sample(fakeResources).category).toBeUndefined();
        });
    });
});
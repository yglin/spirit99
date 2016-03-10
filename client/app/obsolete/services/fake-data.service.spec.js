'use strict';
        
describe('FakeData', function () {
    beforeEach(angular.mock.module('spirit99'));
    var FakeData, DEFAULTS;
    beforeEach(inject(function (_FakeData_, _DEFAULTS_) {
        FakeData = _FakeData_;
        DEFAULTS = _DEFAULTS_;
    }));

    describe(' - genFakeMap()', function () {
        it(' - Should has DEFAULT\'s center and zoom', function () {
            var map = FakeData.genFakeMap();
            expect(map).toEqual(DEFAULTS.map);
        });
    })

    describe(' - genFakePosts()', function () {
        it(' - Should return 10 fake posts as default count', function () {
            var fakePosts = FakeData.genFakePosts();
            expect(fakePosts.length).toBe(10);
        });

        it(' - Should return 50 fake posts if given options.count=50', function () {
            var fakePosts = FakeData.genFakePosts({count: 50});
            expect(fakePosts.length).toBe(50);
        });

        it(' - Should have property "id"', function () {
            var fakePosts = FakeData.genFakePosts();
            expect(_.sample(fakePosts).id).toBeDefined();
        });

        it(' - Should have property "latitude" and "longitude"', function () {
            var fakePosts = FakeData.genFakePosts(); 
            expect(_.sample(fakePosts).latitude).toBeDefined();           
            expect(_.sample(fakePosts).longitude).toBeDefined();           
        });

        it(' - Should have property "category"', function () {
            var fakePosts = FakeData.genFakePosts();
            expect(_.sample(fakePosts).category).toBeDefined();
        });

        it(' - None of posts should have property "category" if given options.countHasCategory=0', function () {
            var fakePosts = FakeData.genFakePosts({countHasCategory: 0});
            expect(_.sample(fakePosts).category).toBeUndefined();
        });
    });
});